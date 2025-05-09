import { Expose, Type } from 'class-transformer';

export class PagingResultDto<T> {
  @Expose()
  total: number;
  @Expose()
  results: T[];

  constructor(total: number, results: T[]) {
    this.total = total;
    this.results = results;
  }
}