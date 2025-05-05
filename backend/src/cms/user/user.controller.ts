import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto, CreateUserResponseDto, UpdateUserDto, UpdateUserResponseDto} from "./dto";
import {Serialize} from "../../common/interceptor/serialize/serialize.interceptor";
import {User} from "../../database/entities";
import {GetUserResponseDto} from "./dto/get-user.response.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Serialize(CreateUserResponseDto)
    @Post()
    async createUser(@Body() userSignUpDto: CreateUserDto): Promise<CreateUserResponseDto> {
        return new CreateUserResponseDto(await this.userService.createUser(new User(userSignUpDto)));
    }

    @Serialize(UpdateUserResponseDto)
    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async updateUser(@Param("id") id: string, @Body() userSignUpDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
        return new UpdateUserResponseDto(await this.userService.updateUser(id, new User(userSignUpDto)));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param("id") id: string): Promise<void> {
        await this.userService.deleteUser(id);
    }

    @Serialize(GetUserResponseDto)
    @Get(':id')
    async getUser(@Param("id") id: string): Promise<GetUserResponseDto> {
        return new GetUserResponseDto(await this.userService.getUser(id));
    }
}
