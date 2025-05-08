import {Injectable} from '@nestjs/common';
import CrudInterface from "./crud.interface";
import {User} from "../entities";
import {FindOptionsOrder, FindOptionsWhere, Repository, FindOptionsRelations} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Paging} from "../../common/type";
import {PagingResult} from "../../common/type";

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
        return this.repository.findOne({
            where: {id: id, isDeleted: false},
            relations: {createdBy: true, updatedBy: true}
        });
    }

    async findBy(filter: FindOptionsWhere<User>, orderBy: FindOptionsOrder<User>): Promise<User[]> {
        const relations: FindOptionsRelations<User> = {createdBy: true, updatedBy: true};
        const where: FindOptionsWhere<User> = {...filter, isDeleted: false};
        return this.repository.find({
            where: where,
            relations: relations,
            order: orderBy,
        });
    }

    async findByWithPagination(filter: FindOptionsWhere<User>, orderBy: FindOptionsOrder<User>, paginate: Paging): Promise<PagingResult<User>> {
        const relations: FindOptionsRelations<User> = {createdBy: true, updatedBy: true};
        const where: FindOptionsWhere<User> = {...filter, isDeleted: false};
        const [data, total] = await this.repository.findAndCount({
            where: where,
            relations: relations,
            order: orderBy,
            take: paginate.limit,
            skip: (paginate.page - 1) * paginate.limit
        });
        return {total: total, result: data};
    }

}
