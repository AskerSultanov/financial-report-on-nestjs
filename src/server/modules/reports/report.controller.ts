import { join } from 'path';
import type { Response } from 'express';
import { Get, Res, Controller } from '@nestjs/common';

@Controller('report')
export class ReportController {
  @Get()
  getReportPage(@Res() res: Response) {
    return res.sendFile(
      join(import.meta.dirname, '../../../src/client/html/report/index.html'),
    );
  }
}
