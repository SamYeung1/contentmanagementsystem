import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {CreateUserResponseDto} from "./dto/create-user-response.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    async createUser(@Body() userSignUpDto: CreateUserDto): Promise<CreateUserResponseDto> {
        return this.userService.createUser(userSignUpDto);
    }
}
