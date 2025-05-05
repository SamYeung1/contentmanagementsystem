import {Expose} from "class-transformer";
import {User} from "../../../database/entities";

@Expose()
export class GetUserResponseDto {
    @Expose()
    id: string;
    @Expose()
    email: string;
    @Expose()
    name: string;
    @Expose()
    isDeleted: boolean;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;
    constructor(params?: Partial<User>) {
        Object.assign(this, params);
    }
}