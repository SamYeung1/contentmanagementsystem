import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Filter } from 'typeorm';
import { Ordering, Paging } from '../type';

export class ListQueryDto<F,O> {
  @IsOptional()
  @ValidateNested()
  @Type(() => Paging)
  paginate?: Paging;

  @IsOptional()
  filter?: Filter<F>;

  @IsOptional()
  orderBy?: Ordering<O>;
}