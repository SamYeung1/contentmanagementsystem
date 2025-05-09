import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserResponseDto, UpdateUserDto, UpdateUserResponseDto, GetUserResponseDto } from './dto';
import { Serialize } from '../../common/interceptor';
import { Ordering, Paging, PagingResult } from '../../common/type';
import { PagingResultDto } from '../../common/dto';
import { Filter } from 'typeorm';
import { UserEntity } from '../../database/entities';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Serialize(CreateUserResponseDto)
  @Post()
  async createUser(@Body() userSignUpDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return new CreateUserResponseDto(await this.userService.createUser(userSignUpDto));
  }

  @Serialize(UpdateUserResponseDto)
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateUser(@Param('id') id: string, @Body() userSignUpDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    return new UpdateUserResponseDto(await this.userService.updateUser(id, userSignUpDto));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }

  @Serialize(GetUserResponseDto)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<GetUserResponseDto> {
    return new GetUserResponseDto(await this.userService.getUser(id));
  }

  @Serialize(PagingResultDto<GetUserResponseDto>)
  @Get()
  async listUsers(@Query('paginate') paginate: Paging, @Query('filter') filter?: Filter<UserEntity>, @Query('orderBy') orderBy?: Ordering<GetUserResponseDto>): Promise<PagingResultDto<GetUserResponseDto>> {
    const result: PagingResult<UserEntity> = await this.userService.findUsersByKeywordPaginate(filter?.like, paginate, orderBy);
    return new PagingResultDto<GetUserResponseDto>(result.total, result.result.map((item) => new GetUserResponseDto(item)));
  }
}
