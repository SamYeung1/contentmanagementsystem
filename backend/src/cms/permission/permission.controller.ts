import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, CreatePermissionResponseDto, UpdatePermissionDto, UpdatePermissionResponseDto, GetPermissionResponseDto } from './dto';
import { Serialize } from '../../common/interceptor';
import { Ordering, Paging, PagingResult } from '../../common/type';
import { PagingResultDto } from '../../common/dto';
import { Filter } from 'typeorm';
import { UserEntity } from '../../database/entities';
import { AuthGuard } from '../../common/guard';
import { CurrentUser } from '../../common/decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class PermissionController {
  constructor(private readonly userService: PermissionService) {
  }

  @Serialize(CreatePermissionResponseDto)
  @Post()
  async createUser(@Body() userSignUpDto: CreatePermissionDto, @CurrentUser() currentUser: UserEntity): Promise<CreatePermissionResponseDto> {
    return new CreatePermissionResponseDto(await this.userService.createUser(userSignUpDto,currentUser));
  }

  @Serialize(UpdatePermissionResponseDto)
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateUser(@Param('id') id: string, @Body() userSignUpDto: UpdatePermissionDto, @CurrentUser() currentUser: UserEntity): Promise<UpdatePermissionResponseDto> {
    return new UpdatePermissionResponseDto(await this.userService.updateUser(id, userSignUpDto,currentUser));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }

  @Serialize(GetPermissionResponseDto)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<GetPermissionResponseDto> {
    return new GetPermissionResponseDto(await this.userService.getUser(id));
  }

  @Serialize(PagingResultDto<GetPermissionResponseDto>)
  @Get()
  async listUsers(@Query('paginate') paginate: Paging, @Query('filter') filter?: Filter<UserEntity>, @Query('orderBy') orderBy?: Ordering<GetPermissionResponseDto>): Promise<PagingResultDto<GetPermissionResponseDto>> {
    const result: PagingResult<UserEntity> = await this.userService.findUsersByKeywordPaginate(filter?.like, paginate, orderBy);
    return new PagingResultDto<GetPermissionResponseDto>(result.total, result.result.map((item) => new GetPermissionResponseDto(item)));
  }
}
