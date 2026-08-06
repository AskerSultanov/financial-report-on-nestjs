import { join } from 'path';
import type { Response } from 'express';
import { Public } from '../auth/publicMetadata.js';
import { Get, Res, Post, Body, Controller } from '@nestjs/common';

import { CreateUserDto } from './dto/newUser.dto.js';
import { RegistrationServices } from './req.service.js';

var oneDayMs = 86_400_000;

@Public()
@Controller('reg')
export class RegistrationController {
  constructor(private readonly regService: RegistrationServices) {}

  @Get()
  getRegistrationPage(@Res() res: Response) {
    var filePath = '../../../src/client/html/registration/index.html';
    return res.sendFile(join(import.meta.dirname, filePath));
  }

  @Post('new')
  async createUser(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Response> {
    var { userId, errText, token, statusCode } =
      await this.regService.createUser(createUserDto);

    if (errText) {
      return res.status(statusCode).json({ errText });
    }

    return res
      .cookie('token', token, { httpOnly: true, maxAge: oneDayMs })
      .cookie('userId', userId, { httpOnly: false, maxAge: oneDayMs })
      .json({ redirectUrl: '/' });
  }
}
