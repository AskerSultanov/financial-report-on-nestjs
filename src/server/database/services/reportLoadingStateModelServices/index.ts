import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';

import {
  ReportLoadingStates,
  ReportLoadingStatesDocument,
} from '../../schemas/reportLoadingState.schema.js';

import {
  IQueueItem,
  IReportLoadingStates,
} from '../../interfaces/reportLoadingState.interface.js';

import { pushToReportsQueue } from './utils/pushToReportsQueue.js';
import { prependToReportsQueue } from './utils/prependToReportsQueue.js';
import { getReportLoadingState } from './utils/getReportLoadingState.js';
import { resetAbandonedReports } from './utils/resetAbandonedReports.js';
import { deleteReportLoadingStates } from './utils/deleteReportLoadingStates.js';
import { setLastReportRequestTimestamp } from './utils/setLastReportRequestTimestamp.js';
import { updateReportLoadingStoppedStatus } from './utils/updateReportLoadingStoppedStatus.js';

@Injectable()
export class ReportLoadingStatesModelServices {
  constructor(
    @InjectModel(ReportLoadingStates.name)
    private reportLoadingStateModel: Model<ReportLoadingStatesDocument>,
  ) {}

  getReportLoadingState: (
    userId: string,
    session: ClientSession | null | undefined,
    selectedFields: string[],
  ) => Promise<IReportLoadingStates> = getReportLoadingState;

  pushToReportsQueue: (
    userId: string,
    periods: IQueueItem[],
    session: ClientSession | null | undefined,
    needToResetAbandonedReports: boolean,
  ) => Promise<void> = pushToReportsQueue;

  prependToReportsQueue: (
    userId: string,
    dateFrom: string,
    dateTo: string,
  ) => Promise<void> = prependToReportsQueue;

  setLastReportRequestTimestamp: (
    userId: string,
    session: ClientSession,
  ) => Promise<void> = setLastReportRequestTimestamp;

  updateReportLoadingStoppedStatus: (
    userId: string,
    newStatus: boolean,
    session: ClientSession | null | undefined,
  ) => Promise<void> = updateReportLoadingStoppedStatus;

  resetAbandonedReports: (userId: string) => Promise<void> =
    resetAbandonedReports;

  deleteReportLoadingStates: (
    userId: string,
    session: ClientSession | null | undefined,
  ) => Promise<void> = deleteReportLoadingStates;
}
