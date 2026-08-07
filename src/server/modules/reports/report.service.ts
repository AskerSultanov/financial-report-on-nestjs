import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GoodsModelServices,
  ReportsModelServices,
} from '../../database/services/index.js';
import { InjectConnection } from '@nestjs/mongoose';

import { getReport } from './services/getReport.js';
import { WBAPIUtils } from './services/utils/WBAPI/index.js';
import { ReportTreeBuilderUtil } from './services/utils/reportTreeBuilder/index.js';

@Injectable()
export class ReportService {
  constructor(
    private readonly wbapi: WBAPIUtils,
    private readonly configService: ConfigService,
    private readonly goodsModelServices: GoodsModelServices,
    private readonly reportTreeBuilder: ReportTreeBuilderUtil,
    private readonly reportsModelServices: ReportsModelServices,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  getReport: (userId: string, reportId: number) => Promise<void> = getReport;
}
