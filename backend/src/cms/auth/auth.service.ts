import { Injectable } from '@nestjs/common';
import { RoleRepository, UserAuthRepository } from '../../database/repositories';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';
import { UserRepository } from '../../database/repositories';
import { AuthType, RoleEntity, UserAuthEntity, UserEntity } from '../../database/entities';
import { AuthErrorException } from '../../common/exception';
import { JwtService } from '@nestjs/jwt';
import { utc } from 'moment';
import { AuthConfigService } from '../../config/database-config/auth-config.service';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { RefreshDto } from './dto/refresh.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { LogoutDto } from './dto/logout.dto';
import { CurrentUserSettingDto } from './dto/current-user-setting.dto';
import { In } from 'typeorm';
import { CurrentUserSettingResponseDto } from './dto/current-user-setting-response.dto';
import { GetRoleResponseDto } from '../role/dto';

interface DecryptedToken {
  jti: string;
  protectedTicket: string;
}

const CRYPTO_LENGTH = 24;

@Injectable()
export class AuthService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  private generateProtectedToken(): string {
    return Buffer.from(crypto.randomBytes(CRYPTO_LENGTH)).toString('hex');
  }

  constructor(private readonly userAuthRepository: UserAuthRepository,
              private readonly userRepository: UserRepository,
              private readonly roleRepository: RoleRepository,
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
        protectedTicket: this.generateProtectedToken(),
      }));
      return new LoginResponseDto(
        'Bearer',
        parseInt(this.authConfigService.authConfig.jwtExpiresIn) * 60,
        await this.generateAccessToken(userAuth),
        await this.generateRefreshToken(userAuth),
      );
    } else {
      throw new AuthErrorException();
    }
  }

  async refresh(input: RefreshDto): Promise<RefreshResponseDto> {
    const decryptedToken: DecryptedToken = JSON.parse(crypto.privateDecrypt({
      key: this.privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    }, Buffer.from(input.refresh_token, 'hex')).toString('utf8'));
    const userAuth = await this.userAuthRepository.findById(decryptedToken.jti);
    if (!userAuth) {
      throw new AuthErrorException();
    }
    if (decryptedToken.protectedTicket !== userAuth.protectedTicket || utc().isAfter(userAuth.refreshTokenExpiredAt)) {
      throw new AuthErrorException();
    }
    userAuth.protectedTicket = this.generateProtectedToken();
    userAuth.refreshTokenExpiredAt = utc().add(this.authConfigService.authConfig.refreshTokenExpiresIn, 'month').toDate();
    await this.userAuthRepository.update(userAuth.tokenId, userAuth);
    return new RefreshResponseDto(
      'Bearer',
      parseInt(this.authConfigService.authConfig.jwtExpiresIn) * 60,
      await this.generateAccessToken(userAuth),
      await this.generateRefreshToken(userAuth),
    );
  }

  private async generateAccessToken(userAuth: UserAuthEntity): Promise<string> {
    return await this.jwtService.signAsync({ sub: userAuth.user.id, jti: userAuth.tokenId });
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

  async logout(input: LogoutDto) {
    const decryptedToken: DecryptedToken = JSON.parse(crypto.privateDecrypt({
      key: this.privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    }, Buffer.from(input.refresh_token, 'hex')).toString('utf8'));
    const userAuth = await this.userAuthRepository.findById(decryptedToken.jti);
    if (!userAuth) {
      throw new AuthErrorException();
    }
    if (decryptedToken.protectedTicket !== userAuth.protectedTicket || utc().isAfter(userAuth.refreshTokenExpiredAt)) {
      throw new AuthErrorException();
    }
    await this.userAuthRepository.delete(userAuth.tokenId);
  }

  async updateCurrentUserSetting(currentUser: UserEntity, currentUserSettingDto: CurrentUserSettingDto): Promise<boolean> {
    const userEntity = new UserEntity({
      name: currentUserSettingDto.name,
      password: currentUserSettingDto.password,
      updatedBy: currentUser,
    });
    if (currentUserSettingDto.roles) {
      const roles: RoleEntity[] = await this.roleRepository.findBy({ id: In(currentUserSettingDto.roles) }, {});
      userEntity.roles = roles;
    }
    await this.userRepository.update(currentUser.id, userEntity);
    return true;
  }
  async getCurrentUserSetting(currentUser: UserEntity):Promise<CurrentUserSettingResponseDto>{
    return {
      id: currentUser.id.toString(),
      name: currentUser.name,
      roles: currentUser.roles.map((role) => new GetRoleResponseDto((role))),
      email: currentUser.email
    }
  }
}
