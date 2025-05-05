import {Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from "../../database/repositories";
import {User} from "../../database/entities";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async createUser(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }

    async updateUser(id: string, user: User): Promise<User> {
        if (!await this.userRepository.findById(parseInt(id))) {
            throw new NotFoundException('User does not exist');
        }
        return await this.userRepository.update(parseInt(id), user);
    }

    async deleteUser(id: string): Promise<boolean> {
        if (!await this.userRepository.findById(parseInt(id))) {
            throw new NotFoundException('User does not exist');
        }
        return this.userRepository.delete(parseInt(id));
    }
    async getUser(id: string): Promise<User> {
        let user:User = await this.userRepository.findById(parseInt(id));
        if (!user) {
            throw new NotFoundException('User does not exist');
        }
        return user;
    }
}
