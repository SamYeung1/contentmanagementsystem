import { Injectable } from '@nestjs/common';
import CrudInterface from './crud.interface';
import { RoleEntity } from '../entities';
import { FindOptionsOrder, FindOptionsWhere, Repository, FindOptionsRelations } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Paging } from '../../common/type';
import { PagingResult } from '../../common/type';

@Injectable()
export class RoleRepository implements CrudInterface<number, RoleEntity> {
  constructor(@InjectRepository(RoleEntity) private readonly repository: Repository<RoleEntity>) {
  }

  create(input: RoleEntity): Promise<RoleEntity> {
    return this.repository.save(input);
  }

  async delete(id: number): Promise<boolean> {
    return (await this.repository.update(id, { isDeleted: true }))?.affected >= 1;
  }

  async update(id: number, input: Omit<RoleEntity, 'id'>): Promise<RoleEntity> {
    const permission: RoleEntity = await this.findById(id);
    permission.id = id;
    permission.name = input.name;
    permission.permissions = input.permissions;
    permission.updatedBy = input.updatedBy;
    return this.repository.save(permission);
  }

  findById(id: number): Promise<RoleEntity | null> {
    return this.repository.findOne({
      where: { id: id, isDeleted: false },
      relations: { createdBy: true, updatedBy: true,permissions:true  },
    });
  }

  findBy(filter: FindOptionsWhere<RoleEntity>, orderBy: FindOptionsOrder<RoleEntity>): Promise<RoleEntity[]> {
    const relations: FindOptionsRelations<RoleEntity> = { createdBy: true, updatedBy: true,permissions:true };
    const where: FindOptionsWhere<RoleEntity> = { ...filter, isDeleted: false };
    return this.repository.find({
      where: where,
      relations: relations,
      order: orderBy,
    });
  }

  async findByWithPagination(filter: FindOptionsWhere<RoleEntity>, orderBy: FindOptionsOrder<RoleEntity>, paginate: Paging): Promise<PagingResult<RoleEntity>> {
    const relations: FindOptionsRelations<RoleEntity> = { createdBy: true, updatedBy: true,permissions:true  };
    const where: FindOptionsWhere<RoleEntity> = { ...filter, isDeleted: false };
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
