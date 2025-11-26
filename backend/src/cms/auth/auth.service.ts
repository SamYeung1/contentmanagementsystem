import { Injectable } from '@nestjs/common';
import { UserAuthRepository } from '../../database/repositories/user-auth.repository';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';
import { UserRepository } from '../../database/repositories';
import { AuthType, UserAuthEntity, UserEntity } from '../../database/entities';
import { AuthErrorException } from '../../common/exception';
import { JwtService } from '@nestjs/jwt';
import { utc } from 'moment';
import { AuthConfigService } from '../../config/database-config/auth-config.service';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { RefreshDto } from './dto/refresh.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';

interface DecryptedToken {
  jti: string;
  protectedTicket: string;
}

const CRYPTO_LENGTH = 24;

@Injectable()
export class AuthService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(private readonly userAuthRepository: UserAuthRepository,
              private readonly userRepository: UserRepository,
              private readonly authConfigService: AuthConfigService,
              private readonly jwtService: JwtService) {
    this.publicKey = fs.readFileSync(this.authConfigService.authConfig.publicKeyPath, 'utf8');
    this.privateKey = fs.readFileSync(this.authConfigService.authConfig.privateKeyPath, 'utf8');
  }

  async login(input: LoginDto): Promise<LoginResponseDto> {
    const user: UserEntity = await this.userRepository.findByEmail(input.email);
    if (!user) throw new AuthErrorException();
    if (await verify(user.password, input.password)) {
      const userAuth = await this.userAuthRepository.create(new UserAuthEntity({
        user: user,
        refreshTokenExpiredAt: utc().add(this.authConfigService.authConfig.refreshTokenExpiresIn, 'month').toDate(),
        type: AuthType.CMS,
        issueAt: utc().toDate(),
        protectedTicket: Buffer.from(crypto.randomBytes(CRYPTO_LENGTH)).toString('hex'),
      }));
      return new LoginResponseDto(
        'Bearer',
        parseInt(this.authConfigService.authConfig.jwtExpiresIn) * 60 * 60,
        await this.generateAccessToken(userAuth),
        await this.generateRefreshToken(userAuth),
      );
    } else {
      throw new AuthErrorException();
    }
  }

  async refresh(input: RefreshDto):Promise<RefreshResponseDto> {
    const decryptedToken: DecryptedToken = JSON.parse(crypto.privateDecrypt({
      key: this.privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    }, Buffer.from(input.refresh_token, 'hex')).toString('utf8'));
    const userAuth = await this.userAuthRepository.findById(decryptedToken.jti);
    if (!userAuth) {
      throw new AuthErrorException();
    }
    if(decryptedToken.protectedTicket !== userAuth.protectedTicket || utc().isAfter(userAuth.refreshTokenExpiredAt)) {
      throw new AuthErrorException();
    }
    await this.userAuthRepository.update(userAuth.tokenId, {
      refreshTokenExpiredAt: utc().add(this.authConfigService.authConfig.refreshTokenExpiresIn, 'month').toDate(),
      protectedTicket: Buffer.from(crypto.randomBytes(CRYPTO_LENGTH)).toString('hex'),
    });
    return new RefreshResponseDto(
      'Bearer',
      parseInt(this.authConfigService.authConfig.jwtExpiresIn) * 60 * 60,
      await this.generateAccessToken(userAuth),
      await this.generateRefreshToken(userAuth),
    );
  }

  private async generateAccessToken(userAuth: UserAuthEntity): Promise<string> {
    return await this.jwtService.signAsync({ sub: userAuth.user.id,jti:userAuth.tokenId });
  }

  private async generateRefreshToken(userAuth: UserAuthEntity): Promise<string> {
    const data: Buffer = Buffer.from(JSON.stringify({
      jti: userAuth.tokenId,
      protectedTicket: userAuth.protectedTicket,
    }));
    const result: Buffer = crypto.publicEncrypt({
      key: this.publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    }, data);
    return result.toString('hex');
  }
}
