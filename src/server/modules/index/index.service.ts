import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  ReportLoadingStateModelServices,
  ReportsModelServices,
  ReportsTreeModelServices,
} from '../../database/services/index.js';

import { IGetMainPageData } from './interfaces/getMainPageData.interface.js';

import { getRestReports } from './services/getRestReports.js';
import { getMainPageData } from './services/getMainPageData.js';
import { IReports } from '../../database/interfaces/reports/index.interface.js';

@Injectable()
export class IndexService {
  constructor(
    private readonly reportsModelServices: ReportsModelServices,
    private readonly reportsTreeModelServices: ReportsTreeModelServices,
    private readonly reportLoadingStateModelServices: ReportLoadingStateModelServices,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  getRestReports: (
    userId: string,
    reportIds: number[],
  ) => Promise<{ reports: IReports }> = getRestReports;

  getMainPageData: (userId: string | undefined) => Promise<IGetMainPageData> =
    getMainPageData;
}
