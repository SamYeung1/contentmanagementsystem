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
import {
  CreatePermissionDto,
  CreatePermissionResponseDto,
  UpdatePermissionDto,
  UpdatePermissionResponseDto,
  GetPermissionResponseDto,
} from './dto';
import { Serialize } from '../../common/interceptor';
import { PagingResult } from '../../common/type';
import { PagingResultDto } from '../../common/dto';
import { PermissionEntity, UserEntity } from '../../database/entities';
import { CurrentUser, Public } from '../../common/decorator';
import { Role } from '../../common/decorator/role.decorator';
import { ListQueryDto } from '../../common/dto/list-query.dto';

@Role('permission')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {
  }

  @Serialize(CreatePermissionResponseDto)
  @Post()
  async createPermission(@Body() userSignUpDto: CreatePermissionDto, @CurrentUser() currentUser: UserEntity): Promise<CreatePermissionResponseDto> {
    return new CreatePermissionResponseDto(await this.permissionService.createPermission(userSignUpDto, currentUser));
  }

  @Serialize(UpdatePermissionResponseDto)
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async updatePermission(@Param('id') id: string, @Body() userSignUpDto: UpdatePermissionDto, @CurrentUser() currentUser: UserEntity): Promise<UpdatePermissionResponseDto> {
    return new UpdatePermissionResponseDto(await this.permissionService.updatePermission(id, userSignUpDto, currentUser));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePermission(@Param('id') id: string): Promise<void> {
    await this.permissionService.deletePermission(id);
  }

  @Serialize(GetPermissionResponseDto)
  @Get(':id')
  async getPermission(@Param('id') id: string): Promise<GetPermissionResponseDto> {
    return new GetPermissionResponseDto(await this.permissionService.getPermission(id));
  }

  @Serialize(PagingResultDto<GetPermissionResponseDto>)
  @Get()
  async listPermissions(@Query() query: ListQueryDto<PermissionEntity, GetPermissionResponseDto>): Promise<PagingResultDto<GetPermissionResponseDto>> {
    const { paginate, filter, orderBy } = query;
    const result: PagingResult<PermissionEntity> = await this.permissionService.findUsersByKeywordPaginate(filter?.like, paginate, orderBy);
    return new PagingResultDto<GetPermissionResponseDto>(result.total, result.result.map((item) => new GetPermissionResponseDto(item)));
  }
}
