import {Injectable} from '@nestjs/common';
import CrudInterface from "./crud.interface";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserRepository implements CrudInterface<number, User> {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) {
    }

    async create(input: User): Promise<User> {
        return this.repository.save(input);
    }

    async delete(id: number): Promise<boolean> {
        return (await this.repository.update(id, {isDeleted: true}))?.affected >= 1;
    }

    async update(id: number, input: Omit<User, "id">): Promise<User> {
        const user: User = new User();
        user.id = id;
        user.name = input.name;
        user.email = input.email;
        user.password = input.password;
        return this.repository.save(user);
    }

    async findById(id: number): Promise<User> {
        return this.repository.findOneBy({id: id,isDeleted: false});
    }


}
