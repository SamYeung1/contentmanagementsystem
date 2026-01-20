import { Injectable } from '@nestjs/common';
import CrudInterface from './crud.interface';
import { PermissionEntity } from '../entities';
import { FindOptionsOrder, FindOptionsWhere, Repository, FindOptionsRelations } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Paging } from '../../common/type';
import { PagingResult } from '../../common/type';

@Injectable()
export class PermissionRepository implements CrudInterface<number, PermissionEntity> {
  constructor(@InjectRepository(PermissionEntity) private readonly repository: Repository<PermissionEntity>) {
  }

  create(input: PermissionEntity): Promise<PermissionEntity> {
    return this.repository.save(input);
  }

  async delete(id: number): Promise<boolean> {
    return (await this.repository.update(id, { isDeleted: true }))?.affected >= 1;
  }

  async update(id: number, input: Omit<PermissionEntity, 'id'>): Promise<PermissionEntity> {
    const permission: PermissionEntity = await this.findById(id);
    permission.id = id;
    permission.name = input.name;
    permission.action = input.action;
    permission.updatedBy = input.updatedBy;
    return this.repository.save(permission);
  }

  findById(id: number): Promise<PermissionEntity | null> {
    return this.repository.findOne({
      where: { id: id, isDeleted: false },
      relations: { createdBy: true, updatedBy: true },
    });
  }

  findBy(filter: FindOptionsWhere<PermissionEntity>, orderBy: FindOptionsOrder<PermissionEntity>): Promise<PermissionEntity[]> {
    const relations: FindOptionsRelations<PermissionEntity> = { createdBy: true, updatedBy: true };
    const where: FindOptionsWhere<PermissionEntity> = { ...filter, isDeleted: false };
    return this.repository.find({
      where: where,
      relations: relations,
      order: orderBy,
    });
  }

  async findByWithPagination(filter: FindOptionsWhere<PermissionEntity> |  FindOptionsWhere<PermissionEntity>[], orderBy: FindOptionsOrder<PermissionEntity>, paginate: Paging): Promise<PagingResult<PermissionEntity>> {
    const relations: FindOptionsRelations<PermissionEntity> = { createdBy: true, updatedBy: true };
    const where = Array.isArray(filter)
      ? filter.map(cond => ({ ...cond, isDeleted: false }))
      : { ...filter, isDeleted: false };
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
