import { join } from 'path';
import { AuthService } from './auth.service.js';
import type { Response, Request } from 'express';
import { Get, Res, Req, Post, Body, Controller } from '@nestjs/common';

import { UserCredentials } from './dto/user.credentials-dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuthPage(@Res() res: Response) {
    return res.sendFile(
      join(import.meta.dirname, '../../src/public/html/auth/index.html'),
    );
  }

  @Post()
  async auth(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: UserCredentials,
  ) {
    var credentialsIsValid = await this.authService.checkCredectials(body);
    console.log({ credentialsIsValid });
  }
}
