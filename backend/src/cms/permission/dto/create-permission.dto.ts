import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  action: string;
  @IsNotEmpty()
  name: string;

}