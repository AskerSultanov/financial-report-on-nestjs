import { join } from 'path';
import type { Response, Request } from 'express';
import { WBTokenServices } from './token.service.js';
import { Get, Res, Post, Body, Controller } from '@nestjs/common';

@Controller('wbtoken')
export class WBTokenController {
  constructor(private readonly wbTokenServices: WBTokenServices) {}

  @Get()
  getWBTokenPage(@Res() res: Response) {
    return res.sendFile(
      join(import.meta.dirname, '../../../src/client/html/wbToken/index.html'),
    );
  }

  @Post('/check-exist/')
  async checkTokenExist(@Res() res: Response, @Body() userId: string) {
    var { token, errorText } =
      await this.wbTokenServices.checkTokenExist(userId);

    return res.json({ errorText });
  }
}
