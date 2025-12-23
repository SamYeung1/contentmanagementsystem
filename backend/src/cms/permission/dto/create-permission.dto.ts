import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  name: string;

}