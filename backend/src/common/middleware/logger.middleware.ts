import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware<Request, Response> {
  private readonly logger = new Logger(LoggerMiddleware.name, { timestamp: true });

  use(req: Request, res: Response, next: (error?: any) => void): any {
    this.logger.log(`[${req.method}][url] - ${req.originalUrl}`);
    this.logger.log(`[${req.method}][Header] - ${JSON.stringify(req.headers)}`);
    this.logger.log(`[${req.method}][Request] - ${JSON.stringify(req.body)}`);
    next();
  }
}
