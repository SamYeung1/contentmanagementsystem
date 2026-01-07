import { CreatePermissionDto } from './create-permission.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
}