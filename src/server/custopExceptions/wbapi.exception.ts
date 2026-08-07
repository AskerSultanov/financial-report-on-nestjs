import { HttpException, HttpStatus } from '@nestjs/common';

export class WBAPIException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus,
    public readonly details?: any,
  ) {
    super({ message, statusCode, details }, statusCode);
  }
}
