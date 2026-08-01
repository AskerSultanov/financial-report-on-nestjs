import { join } from 'path';
import type { Response } from 'express';
import { Get, Res, Controller } from '@nestjs/common';

@Controller('report')
export class ReportController {
  @Get()
  get(@Res() res: Response) {
    return res.sendFile(
      join(import.meta.dirname, '../../src/public/html/report/index.html'),
    );
  }
}
