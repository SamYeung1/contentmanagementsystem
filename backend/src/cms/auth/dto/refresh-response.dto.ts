import { LoginResponseDto } from './login-response.dto';

export class RefreshResponseDto extends LoginResponseDto{
  constructor(token_type: string, expires_in: number, access_token: string, refresh_token: string) {
    super(token_type,expires_in,access_token,refresh_token);
  }
}