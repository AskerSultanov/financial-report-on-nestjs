import mongoose, { ClientSession } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GoodsModelServices,
  ReportsModelServices,
  ReportsTreeModelServices,
  TaxParamsModelServices,
  TokensModelServices,
} from '../../database/services/index.js';
import { InjectConnection } from '@nestjs/mongoose';

import { WBAPIUtils } from './services/utils/WBAPI/index.js';
import { CalcUtils } from './services/utils/calcUtil/index.js';
import { ReportTreeBuilderUtil } from './services/utils/reportTreeBuilder/index.js';
import { ReportsProcessingService } from './services/utils/different/reportProcessing.js';

import { IWBAPIReports } from './services/utils/WBAPI/interfaces/getReports.interface.js';

import { getReport } from './services/getReport.js';
import { createReport } from './services/createReport.js';

var isReportFromFile = false;
var updateWBTokenLastUsedNow = false;

@Injectable()
export class ReportService {
  constructor(
    private readonly wbapi: WBAPIUtils,
    private readonly calcUtils: CalcUtils,
    private readonly configService: ConfigService,
    private readonly goodsModelServices: GoodsModelServices,
    private readonly tokensModelServices: TokensModelServices,
    private readonly reportTreeBuilder: ReportTreeBuilderUtil,
    private readonly reportsModelServices: ReportsModelServices,
    private readonly reportsProcessingService: ReportsProcessingService,
    private readonly taxParamsModelServices: TaxParamsModelServices,
    private readonly reportsTreeModelServices: ReportsTreeModelServices,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  getReport: (userId: string, reportId: number) => Promise<void> = getReport;

  async createReport(userId: string, dateFrom: string, dateTo: string) {
    var session: ClientSession = await this.connection.startSession();

    var { token } = await this.tokensModelServices.getWbTokenByUserId(
      userId,
      session,
      updateWBTokenLastUsedNow,
    );

    var reports = await this.wbapi.getReports(userId, dateFrom, dateTo, token);

    var { reportData, reportPeriodIsEmpty } =
      await this.reportsProcessingService.processReports(
        userId,
        dateFrom,
        dateTo,
        session,
        reports,
      );

    return { reportData, reportPeriodIsEmpty };
  }
}
