import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);
  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      this.logger.log(
        `request method=${request.method} url=${
          request.url
        } id=${randomUUID()} ${this.handleRequestBodyLog(request)} status=${
          response.statusCode
        } timestamp=${new Date().toISOString()}`,
      );
    });
    next();
  }

  private handleRequestBodyLog(request: Request): string {
    if (
      ['POST', 'PUT', 'PATCH'].includes(request.method) &&
      !request.url.includes('auth')
    ) {
      return JSON.stringify(request.body);
    }
    return '';
  }
}
