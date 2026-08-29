import { Injectable } from '@nestjs/common';
import mongoose, { Model, ClientSession } from 'mongoose';
import {
  ReportsWithAccountedFinances,
  ReportsWithAccountedFinancesDocument,
} from '../../schemas/reportsWithAccountedFinances.schema.js';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { IReportsWithAccountedFinances } from '../../interfaces/reportsWithAccountedFinances.interface.js';

import { addReportToAccounted } from './utils/addReportToAccounted.js';
import { removeReportFromAccounted } from './utils/removeReportFromAccounted.js';
import { getReportsWithAccountedFinances } from './utils/getReportsWithAccountedFinances.js';

@Injectable()
export class ReportsWithAccountedFinancesModelServices {
  constructor(
    @InjectConnection()
    private readonly connection: mongoose.Connection,
    @InjectModel(ReportsWithAccountedFinances.name)
    private readonly reportsWithAccountedFinancesModel: Model<ReportsWithAccountedFinancesDocument>,
  ) {}

  foo() {}
  addReportToAccounted: (
    userId: string,
    reportId: number,
    dateFrom: string,
    dateTo: string,
    session: ClientSession,
  ) => Promise<void> = addReportToAccounted;

  removeReportFromAccounted: (
    userId: string,
    reportId: number,
    session: ClientSession,
  ) => Promise<void> = removeReportFromAccounted;

  getReportsWithAccountedFinances: (userId: string) => Promise<{
    reportsWithAccountedFinances: IReportsWithAccountedFinances[];
  }> = getReportsWithAccountedFinances;
}
