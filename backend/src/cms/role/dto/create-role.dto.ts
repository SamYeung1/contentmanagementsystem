import { IsArray, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsArray()
  permissions:number[]
  @IsNotEmpty()
  name: string;

}