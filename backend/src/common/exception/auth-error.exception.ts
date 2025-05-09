import { HttpException } from '@nestjs/common';

export class AuthErrorException extends HttpException {
  constructor() {
    super('Auth Error', 401);
  }
}