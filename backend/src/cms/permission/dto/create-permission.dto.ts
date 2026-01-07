import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @Matches(/^(CREATE|UPDATE|DELETE|READ|\*)@([a-zA-Z0-9]+)$/,{
    message:"Please enter a valid action [i'e: CREATE/UPDATE/DELETE/READ/*@abc]",
  })
  action: string;
  @IsNotEmpty()
  name: string;

}