import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UserRepository} from "../database/repositories/user.repository";
import {User} from "../database/entities/user.entity";
import {CreateUserResponseDto} from "./dto/create-user-response.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }
    async createUser(user: CreateUserDto):Promise<CreateUserResponseDto> {
        return await this.userRepository.create(new User(user));
    }
}
