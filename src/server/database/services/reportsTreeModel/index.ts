import { Model, ClientSession } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ReportsTree,
  ReportsTreeDocument,
} from '../../schemas/reportsTree.schema.js';

import { IYearsPeriod, IReportsTree } from '../../interfaces/reportsTree.interface.js';

import { getReportTree } from './utils/getReportTree.js';
import { updateReportsTree } from './utils/updateReportsTree.js';
import { deleteReportTreeByUserId } from './utils/deleteReportTreeByUserId.js';
import { deleteReportFromReportTree } from './utils/deleteReportFromReportTree.js';

@Injectable()
export class ReportsTreeModelServices {
  constructor(
    @InjectModel(ReportsTree.name)
    private reportsTreeModel: Model<ReportsTreeDocument>,
  ) {}

  getReportTree: (
    userId: string,
    session: ClientSession | null | undefined,
  ) => Promise<{ reportTree: IYearsPeriod[] }> = getReportTree;

  updateReportsTree: (
    userId: string,
    years: IYearsPeriod[],
    session: ClientSession | null | undefined,
  ) => Promise<void> = updateReportsTree;

  deleteReportTreeByUserId: (userId: string) => Promise<void> =
    deleteReportTreeByUserId;

  deleteReportFromReportTree: (
    userId: string,
    year: number,
    month: string,
    reportId: number,
    session: ClientSession | null | undefined,
  ) => Promise<void> = deleteReportFromReportTree;
}
