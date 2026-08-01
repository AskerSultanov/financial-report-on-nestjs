import { join } from 'path';
import type { Response } from 'express';
import { Get, Res, Controller } from '@nestjs/common';

@Controller('wbtoken')
export class WBTokenController {
  @Get()
  getWBTokenPage(@Res() res: Response) {
    return res.sendFile(
      join(import.meta.dirname, '../../src/public/html/wbToken/index.html'),
    );
  }
}
