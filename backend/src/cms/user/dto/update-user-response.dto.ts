import {Expose} from "class-transformer";
import {User} from "../../../database/entities";
export class UpdateUserResponseDto {
    @Expose()
    id: string;
    @Expose()
    email: string;
    @Expose()
    name: string;
    constructor(params?: Partial<User>) {
        Object.assign(this, params);
    }
}