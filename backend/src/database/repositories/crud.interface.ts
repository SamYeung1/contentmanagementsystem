import { Paging, PagingResult } from '../../common/type';

export default interface CrudInterface<ID, I> {
  create: (input: I) => Promise<I>;
  update: (id: ID, input: Omit<I, keyof I>) => Promise<I>;
  delete: (id: ID) => Promise<boolean>;
  findById: (id: ID) => Promise<I | null>;
  findBy: (filter: any, orderBy: any) => Promise<I[]>;
  findByWithPagination: (filter: any, orderBy: any, paginate: Paging) => Promise<PagingResult<I>>;
}