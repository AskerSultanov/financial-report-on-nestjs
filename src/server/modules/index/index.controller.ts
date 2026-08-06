import { join } from 'path';
import type { Response } from 'express';
import { Get, Res, Param, Controller, Body, Post } from '@nestjs/common';

import { IndexService } from './index.service.js';
import { IGetMainPageData } from './interfaces/getMainPageData.interface.js';

import { GetRestReportsDto } from './dto/getReportReports.dto.js';

@Controller()
export class IndexController {
  constructor(private readonly indexControllerServices: IndexService) {}

  @Get()
  get(@Res() res: Response) {
    return res.sendFile(
      join(import.meta.dirname, '../../../src/client/html/index.html'),
    );
  }

  @Get('/api/:userId/')
  async getMainPageData(
    @Param('userId') userId: string | undefined,
  ): Promise<IGetMainPageData> {
    return await this.indexControllerServices.getMainPageData(userId);
  }

  @Get('/api/rest-reports')
  async getRestReports(@Body() getRestReportsDto: GetRestReportsDto) {
    var userId = getRestReportsDto.userId;
    var reportIds = getRestReportsDto.reportIds;
    return await this.indexControllerServices.getRestReports(userId, reportIds);
  }

  @Post()
  logout(@Res() res: Response) {
    return res.clearCookie('token').redirect('/');
  }
}
