import { join } from 'path';
import type { Response, Request, NextFunction } from 'express';
import {
  Get,
  Res,
  Req,
  Post,
  Param,
  Controller,
  Body,
  Next,
} from '@nestjs/common';

import { ReportService } from './report.service.js';

import { GetReportDto } from './dto/getReportDto.js';
import { CreateReportDto } from './dto/createReportDto.js';

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

  @Post()
  async reportLoadDelegate(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    var { needToLoadAllReports } = req.body;

    if (needToLoadAllReports) {
      try {
        var { status } = await sendReportPeriodsToReportLoader(req.body);
        return res.status(status).json({
          msg: 'Загрузка отчётов началась. Они будут отображаться по мере их добавления',
        });
      } catch {
        return res.status(503).json({
          msg: 'Не удалось загрузить отчёты за выбранный период.\nВременно доступна загрузка отчётов по одному',
        });
      }
    }

    var { isPeriodWithinSameWeek } = req.body;

    if (!isPeriodWithinSameWeek) {
      try {
        var { status } = await sendReportPeriodsToReportLoader(req.body);
        return res.status(status).json({
          msg: 'Загрузка отчётов началась. Они будут отображаться по мере их добавления',
        });
      } catch {
        return res.status(503).json({
          msg: 'Не удалось загрузить отчёты за выбранный период.\nВременно доступна загрузка отчётов по одному',
        });
      }
    }

    var { lastReportRequestTimestamp } = await getReportLoadingState(
      req.body.userId,
    );

    var { nextRequestDelayMs } = shouldWaitBeforeNextRequest(
      lastReportRequestTimestamp,
    );
    if (nextRequestDelayMs) {
      try {
        req.body.needsReportLoadingDelay = true;
        req.body.nextRequestDelayMs = nextRequestDelayMs;
        var { status } = await sendReportPeriodsToReportLoader(req.body);
        return res.status(status).json({ msg: 'Отчет скоро будет добавлен.' });
      } catch (e) {
        return res.status(500).json({
          msg: 'Произошла ошибка при добавлении отчета.\nПопробуйте повторить через минуту.',
        });
      }
    }

    
    next();
  }

  async createReport(@Body() createReportDto: CreateReportDto) {
    return await this.reportService.createReport(createReportDto);
  }
}
