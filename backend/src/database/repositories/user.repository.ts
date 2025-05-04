import { Injectable } from '@nestjs/common';
import CrudInterface from "./crud.interface";
import {User} from "../entities/user.entity";

@Injectable()
export class UserRepository implements CrudInterface<User>{
    async create(data: User): Promise<User> {
        return Promise.resolve(undefined);
    }

    async delete(id: User): Promise<boolean> {
        return Promise.resolve(false);
    }

    async update(data: User): Promise<User> {
        return Promise.resolve(undefined);
    }

}
