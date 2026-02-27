import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LogoutDto } from './dto/logout.dto';
import { CurrentUser, Public } from '../../common/decorator';
import { UserEntity } from '../../database/entities';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { Serialize } from '../../common/interceptor';
import { CurrentUserResponseDto } from './dto/current-user-response.dto';
import { NoRole } from '../../common/decorator';
import { CurrentUserDto } from './dto/current-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  @Public()
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @Public()
  refresh(@Body() refreshDto: RefreshDto): Promise<RefreshResponseDto> {
    return this.authService.refresh(refreshDto);
  }

  @Post('logout')
  @Public()
  logout(@Body() logoutDto: LogoutDto): Promise<void> {
    return this.authService.logout(logoutDto);
  }

  @Get('me')
  @NoRole()
  @Serialize(CurrentUserResponseDto)
  async currentUser(@CurrentUser() currentUser: UserEntity): Promise<CurrentUserResponseDto> {
    return new CurrentUserResponseDto(currentUser);
  }

  @Put('me')
  @NoRole()
  @Serialize(CurrentUserResponseDto)
  async updateCurrentUser(@CurrentUser() currentUser: UserEntity, @Body() currentUserDto: CurrentUserDto): Promise<CurrentUserResponseDto> {
    return this.authService.updateCurrentUser(currentUser,currentUserDto);
  }
}
