import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;
  @IsNotEmpty()
  @IsArray()
  roles:number[]

}