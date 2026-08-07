import { join } from 'path';
import type { Response } from 'express';
import { Get, Res, Param, Controller } from '@nestjs/common';

import { ReportService } from './report.service.js';

import { GetReportDto } from './dto/getReportDto.js';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getReportPage(@Res() res: Response) {
    return res.sendFile(
      join(import.meta.dirname, '../../../src/client/html/report/index.html'),
    );
  }

  @Get('/:userId/:reportId')
  async getReport(@Param() getReportDto: GetReportDto) {
    var userId = getReportDto.userId;
    var reportId = getReportDto.reportId;
    return await this.reportService.getReport(userId, reportId);
  }
}
