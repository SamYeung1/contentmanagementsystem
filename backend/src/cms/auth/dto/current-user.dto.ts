import {  Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CurrentUserDto {
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  password?: string;
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;
  @IsNotEmpty()
  @IsArray()
  roles:number[]
  constructor(params?: Partial<CurrentUserDto>) {
    Object.assign(this, params);
  }
}