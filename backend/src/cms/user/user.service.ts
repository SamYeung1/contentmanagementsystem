import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../database/repositories';
import { UserEntity } from '../../database/entities';
import { Ordering, Paging, PagingResult } from '../../common/type';
import { DatabaseFilterUtil } from '../../common/util';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.create(new UserEntity(user));
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<UserEntity> {
    if (!await this.userRepository.findById(parseInt(id))) {
      throw new NotFoundException('User does not exist');
    }
    return await this.userRepository.update(parseInt(id), new UserEntity(user));
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
