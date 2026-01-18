import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class Paging {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  limit: number;
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page: number;
}