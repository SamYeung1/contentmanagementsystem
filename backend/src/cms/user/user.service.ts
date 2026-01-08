import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository, UserRepository } from '../../database/repositories';
import { PermissionEntity, RoleEntity, UserEntity } from '../../database/entities';
import { Ordering, Paging, PagingResult } from '../../common/type';
import { DatabaseFilterUtil } from '../../common/util';
import { CreateUserDto, UpdateUserDto } from './dto';
import { In } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,private readonly roleRepository: RoleRepository) {
  }

  async createUser(user: CreateUserDto, currentUser: UserEntity): Promise<UserEntity> {
    const roles: RoleEntity[] = await this.roleRepository.findBy({ id: In(user.roles) }, {});
    return await this.userRepository.create(new UserEntity({ ...user,roles:roles,updatedBy: currentUser,createdBy:currentUser }));
  }

  async updateUser(id: string, user: UpdateUserDto, currentUser: UserEntity): Promise<UserEntity> {
    if (!await this.userRepository.findById(parseInt(id))) {
      throw new NotFoundException('User does not exist');
    }
    const userEntity = new UserEntity({
      name: user.name,
      password:user.password,
      updatedBy: currentUser,
    });
    if (user.roles) {
      const roles: RoleEntity[] = await this.roleRepository.findBy({ id: In(user.roles) }, {});
      userEntity.roles = roles;
    }
    return await this.userRepository.update(parseInt(id),userEntity);
  }

  async deleteUser(id: string): Promise<boolean> {
    if (!await this.userRepository.findById(parseInt(id))) {
      throw new NotFoundException('User does not exist');
    }
    return this.userRepository.delete(parseInt(id));
  }

  async getUser(id: string): Promise<UserEntity> {
    let user: UserEntity = await this.userRepository.findById(parseInt(id));
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async findUsersByKeywordPaginate(like?: Record<keyof UserEntity, string>, paginate: Paging = {
    page: 1,
    limit: 10,
  }, orderBy: Ordering<UserEntity> = { id: 'asc' }): Promise<PagingResult<UserEntity>> {
    let where = {};
    if (like) {
      where = DatabaseFilterUtil.createLikeFilter<UserEntity>(like);
    }
    return this.userRepository.findByWithPagination({ ...where, isDeleted: false }, orderBy, paginate);
  }
}
