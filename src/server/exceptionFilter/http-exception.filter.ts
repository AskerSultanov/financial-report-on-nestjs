import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    var ctx = host.switchToHttp();
    var statusCode = exception.getStatus();
    var request = ctx.getRequest<Request>();
    var response = ctx.getResponse<Response>();

    if (exception instanceof UnauthorizedException) {
      return response.sendFile(
        join(import.meta.dirname, '../../src/client/html/auth/index.html'),
      );
    } else {
      response.status(statusCode).json({
        statusCode,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
