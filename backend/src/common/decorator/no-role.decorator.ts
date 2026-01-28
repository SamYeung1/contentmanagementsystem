import { SetMetadata } from '@nestjs/common';

export const IS_NO_ROLE_KEY = "IS_NO_ROLE";
export const NoRole =  () => SetMetadata(IS_NO_ROLE_KEY, true);
