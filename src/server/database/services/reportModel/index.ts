import { Injectable } from '@nestjs/common';
import { Model, ClientSession } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IReport } from '../../interfaces/report.interface.js';
import { Report, ReportDocument } from '../../schemas/reports.schema.js';
import {
  IUpdatedReportSkus,
  IUpdatedReport,
} from './interfaces/updatedReportSkus.interface.js';

import { getReportById } from './utils/getReportById.js';
import { saveReportToDb } from './utils/saveReportToDb.js';
import { saveUpdatedReport } from './utils/saveUpdatedReport.js';
import { saveUpdatedReports } from './utils/saveUpdatedReports.js';
import { getReportsByUserId } from './utils/getReportsByUserId.js';
import { deleteReportFromDb } from './utils/deleteReportFromDb.js';
import { getAllDataFromReportCollection } from './utils/getAllDataFromReportCollection.js';

@Injectable()
export class ReportsModelServices {
  constructor(
    @InjectModel(Report.name) private reportsModel: Model<ReportDocument>,
  ) {}

  getReportById: (
    userId: string,
    reportId: number,
    session: ClientSession | null | undefined,
  ) => Promise<{ report: IReport }> = getReportById;

  getReportsByUserId: (
    userId: string,
    session: ClientSession,
    selectedFields: string[],
    reportIds: number[],
  ) => Promise<{
    reports: IReport[];
  }> = getReportsByUserId;

  getAllDataFromReportCollection: () => Promise<IReport[]> =
    getAllDataFromReportCollection;

  saveReportToDb: (report: IReport, session: ClientSession) => Promise<void> =
    saveReportToDb;

  saveUpdatedReport: (
    userId: string,
    reportId: number,
    updatedSkus: IUpdatedReportSkus[],
    session: ClientSession,
  ) => Promise<void> = saveUpdatedReport;

  saveUpdatedReports: (
    userId: string,
    reports: IUpdatedReport[],
    session: ClientSession,
  ) => Promise<void> = saveUpdatedReports;

  deleteReportFromDb: (
    userId: string,
    reportId: number,
    session: ClientSession,
  ) => Promise<{ reportBeforeDeletion: IReport }> = deleteReportFromDb;
}
