import { getReportPeriods } from './utils/getReportPeriods.js';
import { checkReportExistByDate } from './utils/checkReportExistByDate.js';
import { addReportToReportPeriods } from './utils/addReportToReportPeriods.js';
import { removeReportFromReportPeriods } from './utils/removeReportFromReportPeriods.js';

import { ClientSession, Model } from 'mongoose';
import {
  IReportPeriods,
  IReportPeriodsItem,
} from '../../interfaces/reportPeriods.interface.js';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ReportPeriods,
  ReportPeriodDocument,
} from '../../schemas/reportPeriods.schema.js';

@Injectable()
export class ReportPeriodsModelServices {
  constructor(
    @InjectModel(ReportPeriods.name)
    private reportPeriodsModel: Model<ReportPeriodDocument>,
  ) {}

  getReportPeriods: (
    userId: string,
    session: ClientSession,
  ) => Promise<{ reportPeriods: IReportPeriods }> = getReportPeriods;

  checkReportExistByDate: (
    userId: string,
    dateFrom: string,
    session: ClientSession,
  ) => Promise<null | { reportPeriods: IReportPeriods }> =
    checkReportExistByDate;

  addReportToReportPeriods: (
    userId: string,
    report: IReportPeriodsItem,
    session: ClientSession,
  ) => Promise<void> = addReportToReportPeriods;

  removeReportFromReportPeriods: (
    userId: string,
    dateFrom: string,
    dateTo: string,
    session: ClientSession,
  ) => Promise<void> = removeReportFromReportPeriods;
}
