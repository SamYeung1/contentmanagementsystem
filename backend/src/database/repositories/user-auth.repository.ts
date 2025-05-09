import { Injectable } from '@nestjs/common';
import { Paging, PagingResult } from '../../common/type';
import CrudInterface from './crud.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { UserAuthEntity } from '../entities';

@Injectable()
export class UserAuthRepository implements CrudInterface<string, UserAuthEntity> {
  constructor(@InjectRepository(UserAuthEntity) private readonly repository: Repository<UserAuthEntity>) {
  }

  create(input: UserAuthEntity): Promise<UserAuthEntity> {
    return this.repository.save(input);
  }

  async delete(id: string): Promise<boolean> {
    return (await this.repository.delete(id))?.affected >= 1;
  }

  update(token_id: string, input: Omit<UserAuthEntity, 'tokenId'>): Promise<UserAuthEntity> {
    const userAuth: UserAuthEntity = new UserAuthEntity();
    userAuth.tokenId = token_id;
    userAuth.user = input.user;
    userAuth.refreshTokenExpiredAt = input.refreshTokenExpiredAt;
    return this.repository.save(userAuth);
  }

  findBy(filter: any, orderBy: any): Promise<UserAuthEntity[]> {
    const relations: FindOptionsRelations<UserAuthEntity> = { user: true };
    const where: FindOptionsWhere<UserAuthEntity> = filter;
    return this.repository.find({
      where: where,
      relations: relations,
      order: orderBy,
    });
  }

  findById(id: string): Promise<UserAuthEntity | null> {
    return this.repository.findOne({
      where: { tokenId: id },
      relations: { user: true },
    });
  }

  async findByWithPagination(filter: any, orderBy: any, paginate: Paging): Promise<PagingResult<UserAuthEntity>> {
    const relations: FindOptionsRelations<UserAuthEntity> = { user: true };
    const where: FindOptionsWhere<UserAuthEntity> = filter;
    const [data, total] = await this.repository.findAndCount({
      where: where,
      relations: relations,
      order: orderBy,
      take: paginate.limit,
      skip: (paginate.page - 1) * paginate.limit,
    });
    return { total: total, result: data };
  }
}