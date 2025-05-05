import {OmitType} from "@nestjs/swagger";
import {User} from "../../database/entities/user.entity";

export class CreateUserResponseDto extends OmitType(User, ['password'] as const) {}