import { Injectable, NotFoundException } from '@nestjs/common';
import { PermissionEntity, UserEntity } from '../../database/entities';
import { Ordering, Paging, PagingResult } from '../../common/type';
import { DatabaseFilterUtil } from '../../common/util';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import { PermissionRepository } from '../../database/repositories';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {
  }

  async createPermission(permission: CreatePermissionDto, currentUser: UserEntity): Promise<PermissionEntity> {
    return await this.permissionRepository.create(new PermissionEntity({ ...permission,updatedBy: currentUser,createdBy:currentUser }));
  }

  async updatePermission(id: string, permission: UpdatePermissionDto, currentUser: UserEntity): Promise<PermissionEntity> {
    if (!await this.permissionRepository.findById(parseInt(id))) {
      throw new NotFoundException('Permission does not exist');
    }
    return await this.permissionRepository.update(parseInt(id), new PermissionEntity({
      ...permission,
      updatedBy: currentUser,
    }));
  }

  async deletePermission(id: string): Promise<boolean> {
    if (!await this.permissionRepository.findById(parseInt(id))) {
      throw new NotFoundException('Permission does not exist');
    }
    return this.permissionRepository.delete(parseInt(id));
  }

  async getPermission(id: string): Promise<PermissionEntity> {
    let permission: PermissionEntity = await this.permissionRepository.findById(parseInt(id));
    if (!permission) {
      throw new NotFoundException('Permission does not exist');
    }
    return permission;
  }

  async findUsersByKeywordPaginate(like?: Record<keyof PermissionEntity, string>, paginate: Paging = {
    page: 1,
    limit: 10,
  }, orderBy: Ordering<PermissionEntity> = { id: 'asc' }): Promise<PagingResult<PermissionEntity>> {
    let where = {};
    if (like) {
      where = DatabaseFilterUtil.createLikeFilter<PermissionEntity>(like,true);
    }
    return this.permissionRepository.findByWithPagination(where, orderBy, paginate);
  }
}
