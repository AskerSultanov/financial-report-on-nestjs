import { join } from 'path';
import type { Response } from 'express';
import { Public } from './publicMetadata.js';
import { AuthService } from './auth.service.js';
import { Get, Res, Post, Body, Controller } from '@nestjs/common';

import { UserCredentialsDto } from './dto/user.credentials-dto.js';

var oneDayMs = 86_400_000;

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuthPage(@Res() res: Response) {
    return res.sendFile(
      join(import.meta.dirname, '../../../src/client/html/auth/index.html'),
    );
  }

  @Post()
  async auth(
    @Res() res: Response,
    @Body() userCredentials: UserCredentialsDto,
  ) {
    var { userId, token } = await this.authService.singIn(userCredentials);
    console.log({ token });
    return res
      .cookie('token', token, { httpOnly: true, maxAge: oneDayMs })
      .cookie('userId', userId, { httpOnly: false, maxAge: oneDayMs })
      .json({ redirectUrl: '/' });
  }
}
