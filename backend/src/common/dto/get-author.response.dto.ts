import { Expose, Type } from 'class-transformer';

export class GetAuthorResponseDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;
}