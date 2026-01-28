import { IsNotEmpty, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePermissionDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Matches(/^(CREATE|UPDATE|DELETE|READ|\*)@([a-zA-Z0-9]+)$/,{
    message:"Please enter a valid action [i'e: CREATE/UPDATE/DELETE/READ/*@abc]",
  })
  action: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  name: string;

}