import {Expose, Type} from "class-transformer";
import {User} from "../../../database/entities";

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
    @Expose()
    @Type(() => GetUserResponseDto)
    createdBy: GetUserResponseDto;
    @Expose()
    @Type(() => GetUserResponseDto)
    updatedBy: GetUserResponseDto;
    constructor(params?: Partial<User>) {
        Object.assign(this, params);
    }
}