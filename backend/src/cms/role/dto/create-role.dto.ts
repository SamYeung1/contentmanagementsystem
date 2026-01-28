import { IsArray, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsArray()
  permissions:number[]
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;

}