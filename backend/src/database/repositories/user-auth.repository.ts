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

  async update(token_id: string, input: Partial<Omit<UserAuthEntity, 'tokenId' | 'user'>>): Promise<UserAuthEntity> {
    const relations: FindOptionsRelations<UserAuthEntity> = { user: true };
    const userAuth: UserAuthEntity = await this.repository.findOne({
      where:{tokenId:token_id},
      relations:relations
  })
    userAuth.refreshTokenExpiredAt = input.refreshTokenExpiredAt;
    userAuth.protectedTicket = input.protectedTicket;
    return await this.repository.save(userAuth);
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