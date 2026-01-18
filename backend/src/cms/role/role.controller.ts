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
} from '@nestjs/common';
import { CreateRoleDto, CreateRoleResponseDto, UpdateRoleDto, UpdateRoleResponseDto, GetRoleResponseDto } from './dto';
import { Serialize } from '../../common/interceptor';
import { Ordering, Paging, PagingResult } from '../../common/type';
import { PagingResultDto } from '../../common/dto';
import { Filter } from 'typeorm';
import { RoleEntity, UserEntity } from '../../database/entities';
import { CurrentUser } from '../../common/decorator';
import { RoleService } from './role.service';
import { Role } from '../../common/decorator/role.decorator';
import { ListQueryDto } from '../../common/dto/list-query.dto';

@Role("role")
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }

  @Serialize(CreateRoleResponseDto)
  @Post()
  async createRole(@Body() userSignUpDto: CreateRoleDto, @CurrentUser() currentUser: UserEntity): Promise<CreateRoleResponseDto> {
    return new CreateRoleResponseDto(await this.roleService.createRole(userSignUpDto,currentUser));
  }

  @Serialize(UpdateRoleResponseDto)
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateRole(@Param('id') id: string, @Body() userSignUpDto: UpdateRoleDto, @CurrentUser() currentUser: UserEntity): Promise<UpdateRoleResponseDto> {
    return new UpdateRoleResponseDto(await this.roleService.updateRole(id, userSignUpDto,currentUser));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRole(@Param('id') id: string): Promise<void> {
    await this.roleService.deleteRole(id);
  }

  @Serialize(GetRoleResponseDto)
  @Get(':id')
  async getRole(@Param('id') id: string): Promise<GetRoleResponseDto> {
    return new GetRoleResponseDto(await this.roleService.getRole(id));
  }

  @Serialize(PagingResultDto<GetRoleResponseDto>)
  @Get()
  async listRoles(@Query() query: ListQueryDto<RoleEntity, GetRoleResponseDto>): Promise<PagingResultDto<GetRoleResponseDto>> {
    const { paginate, filter, orderBy } = query;
    const result: PagingResult<RoleEntity> = await this.roleService.findUsersByKeywordPaginate(filter?.like, paginate, orderBy);
    return new PagingResultDto<GetRoleResponseDto>(result.total, result.result.map((item) => new GetRoleResponseDto(item)));
  }
}
