import { Injectable } from '@nestjs/common';
import { Model, ClientSession } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


import { Reports, ReportsDocument } from '../../schemas/reports.schema.js';
import { IReports, IReportsWithAccountedFinances } from '../../interfaces/repots/index.interface.js';

import { getReportById } from './utils/getReportById.js';
import { saveReportToDb } from './utils/saveReportToDb.js';
import { saveUpdatedReport } from './utils/saveUpdatedReport.js';
import { saveUpdatedReports } from './utils/saveUpdatedReports.js';
import { getReportsByUserId } from './utils/getReportsByUserId.js';
import { deleteReportFromDb } from './utils/deleteReportFromDb.js';
import { addReportToAccounted } from './utils/addReportToAccounted.js';
import { checkReportExistsToDb } from './utils/checkReportExistsToDb.js';
import { removeReportFromAccounted } from './utils/removeReportFromAccounted.js';
import { getAllDataFromReportCollection } from './utils/getAllDataFromReportCollection.js';

@Injectable()
export class ReportsModelServices {
  constructor(
    @InjectModel(Reports.name) private reportsModel: Model<ReportsDocument>,
  ) {}

  getReportById: (
    userId: string,
    reportId: number,
    session: ClientSession | null | undefined,
  ) => Promise<{ report: IReports }> = getReportById;

  getReportsByUserId: (
    userId: string,
    session: ClientSession,
    selectedFields: string[],
    reportIds: number[],
  ) => Promise<{
    reports: IReports;
    reportsWithAccountedFinances?: IReportsWithAccountedFinances;
  }> = getReportsByUserId;

  getAllDataFromReportCollection: () => Promise<IReports[]> =
    getAllDataFromReportCollection;

  addReportToAccounted: (userId: string, reportId: number) => Promise<void> =
    addReportToAccounted;

  saveReportToDb: (
    userId: string,
    report: IReports,
    session: ClientSession,
  ) => Promise<void> = saveReportToDb;

  saveUpdatedReport: (
    userId: string,
    reportId: number,
    report: IReports,
  ) => Promise<void> = saveUpdatedReport;

  saveUpdatedReports: (
    userId: string,
    reports: IReports[],
    session: ClientSession,
  ) => Promise<void> = saveUpdatedReports;

  checkReportExistsToDb: (
    userId: string,
    dateFrom: string,
    dateTo: string,
  ) => Promise<IReports> = checkReportExistsToDb;

  removeReportFromAccounted: (
    userId: string,
    reportId: number,
  ) => Promise<void> = removeReportFromAccounted;

  deleteReportFromDb: (
    userId: string,
    reportId: number,
    session: ClientSession,
  ) => Promise<{ reportBeforeDeletion: IReports }> = deleteReportFromDb;
}
