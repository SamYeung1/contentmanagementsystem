import { Injectable } from '@nestjs/common';
import CrudInterface from './crud.interface';
import { UserEntity } from '../entities';
import { FindOptionsOrder, FindOptionsWhere, Repository, FindOptionsRelations } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Paging } from '../../common/type';
import { PagingResult } from '../../common/type';

@Injectable()
export class UserRepository implements CrudInterface<number, UserEntity> {
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {
  }

  create(input: UserEntity): Promise<UserEntity> {
    return this.repository.save(input);
  }

  async delete(id: number): Promise<boolean> {
    return (await this.repository.update(id, { isDeleted: true }))?.affected >= 1;
  }

  async update(id: number, input: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const user: UserEntity = await this.findById(id);
    user.name = input.name;
    user.email = input.email;
    user.password = input.password;
    user.updatedBy = input.updatedBy;
    user.roles = input.roles;
    return this.repository.save(user);
  }

  findById(id: number): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: { id: id, isDeleted: false },
      relations: { createdBy: true, updatedBy: true, roles: true },
    });
  }

  findBy(filter: FindOptionsWhere<UserEntity>, orderBy: FindOptionsOrder<UserEntity>): Promise<UserEntity[]> {
    const relations: FindOptionsRelations<UserEntity> = { createdBy: true, updatedBy: true, roles: true  };
    const where: FindOptionsWhere<UserEntity> = { ...filter, isDeleted: false };
    return this.repository.find({
      where: where,
      relations: relations,
      order: orderBy,
    });
  }

  async findByWithPagination(filter: FindOptionsWhere<UserEntity>, orderBy: FindOptionsOrder<UserEntity>, paginate: Paging): Promise<PagingResult<UserEntity>> {
    const relations: FindOptionsRelations<UserEntity> = { createdBy: true, updatedBy: true , roles: true };
    const where: FindOptionsWhere<UserEntity> = { ...filter, isDeleted: false };
    const [data, total] = await this.repository.findAndCount({
      where: where,
      relations: relations,
      order: orderBy,
      take: paginate.limit,
      skip: (paginate.page - 1) * paginate.limit,
    });
    return { total: total, result: data };
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: { email: email, isDeleted: false },
      relations: { createdBy: true, updatedBy: true, roles: true  },
    });
  }

}
