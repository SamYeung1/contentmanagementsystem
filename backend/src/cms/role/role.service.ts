import { Injectable, NotFoundException } from '@nestjs/common';
import { PermissionEntity, RoleEntity, UserEntity } from '../../database/entities';
import { Ordering, Paging, PagingResult } from '../../common/type';
import { DatabaseFilterUtil } from '../../common/util';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RoleRepository, PermissionRepository } from '../../database/repositories';
import { In } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository, private readonly permissionRepository: PermissionRepository) {
  }

  async createRole(role: CreateRoleDto, currentUser: UserEntity): Promise<RoleEntity> {
    const permissions: PermissionEntity[] = await this.permissionRepository.findBy({ id: In(role.permissions) }, {});
    return await this.roleRepository.create(new RoleEntity({
      ...role,
      permissions: permissions,
      updatedBy: currentUser,
      createdBy: currentUser,
    }));
  }

  async updateRole(id: string, role: UpdateRoleDto, currentUser: UserEntity): Promise<RoleEntity> {
    if (!await this.roleRepository.findById(parseInt(id))) {
      throw new NotFoundException('Role does not exist');
    }
    const roleEntity = new RoleEntity({
      name: role.name,
      updatedBy: currentUser,
    });
    if (role.permissions) {
      const permissions: PermissionEntity[] = await this.permissionRepository.findBy({ id: In(role.permissions) }, {});
      roleEntity.permissions = permissions;
    }
    return await this.roleRepository.update(parseInt(id), roleEntity);
  }

  async deleteRole(id: string): Promise<boolean> {
    if (!await this.roleRepository.findById(parseInt(id))) {
      throw new NotFoundException('Role does not exist');
    }
    return this.roleRepository.delete(parseInt(id));
  }

  async getRole(id: string): Promise<RoleEntity> {
    let role: RoleEntity = await this.roleRepository.findById(parseInt(id));
    if (!role) {
      throw new NotFoundException('Role does not exist');
    }
    return role;
  }

  async findUsersByKeywordPaginate(like?: Record<keyof RoleEntity, string>, paginate: Paging = {
    page: 1,
    limit: 10,
  }, orderBy: Ordering<RoleEntity> = { id: 'asc' }): Promise<PagingResult<RoleEntity>> {
    let where = {};
    if (like) {
      where = DatabaseFilterUtil.createLikeFilter<RoleEntity>(like,true);
    }
    return this.roleRepository.findByWithPagination(where, orderBy, paginate);
  }
}
