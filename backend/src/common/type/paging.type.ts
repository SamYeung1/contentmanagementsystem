import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class Paging {
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  limit: number;
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  page: number;
}