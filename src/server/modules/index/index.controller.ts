import { join } from 'path';
import type { Response } from 'express';
import { Get, Res, Controller } from '@nestjs/common';

@Controller()
export class IndexController {
  @Get()
  get(@Res() res: Response) {
    console.log(import.meta.dirname);
    return res.sendFile(
      join(import.meta.dirname, '../../src/public/html/index.html'),
    );
  }
}
