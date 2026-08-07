import { WBAPIException } from '../../../../../../custopExceptions/wbapi.exception.js';

import { IWBAPIReports } from '../interfaces/getReports.interface.js';

import createPaidStorageReportTask from './createPaidStorageReportTask.js';
import getWeeklyFinancialReportFromWBAPI from './getWeeklyFinancialReportFromWBAPI.js';
import getAdvertisingCostsReportFromWBAPI from './getAdvertisingCostsReportFromWBAPI.js';
import getPaidStorageReportByTaskIdFromWBAPI from './getPaidStorageReportByTaskIdFromWBAPI.js';
import { checkPaidStorageReportCreationStatus } from './checkPaidStorageReportCreationStatus.js';

export async function getReports(
  userId: string,
  dateFrom: string,
  dateTo: string,
  token: string,
): Promise<IWBAPIReports> {
  var { taskId } = await createPaidStorageReportTask(
    dateFrom,
    dateTo,
    token,
    userId,
  );
  var { statusIsDone } = await checkPaidStorageReportCreationStatus(
    taskId,
    token,
    userId,
  );

  if (!statusIsDone) {
    var msg = 'can not create paid storage report task';
    throw new WBAPIException(msg, 304, userId);
  }

  var [weeklyFinancialReport, paidStorageReport, advertisingReport] =
    await Promise.all([
      getWeeklyFinancialReportFromWBAPI(dateFrom, dateTo, token, userId),
      getPaidStorageReportByTaskIdFromWBAPI(taskId, token, userId),
      getAdvertisingCostsReportFromWBAPI(dateFrom, dateTo, token, userId),
    ]);

  if (
    [weeklyFinancialReport, paidStorageReport, advertisingReport].every(
      (i) => !i.length,
    )
  ) {
    var msg = 'Нет отчетов за выбранный период';
    throw new WBAPIException(msg, 404, userId);
  }

  return { weeklyFinancialReport, paidStorageReport, advertisingReport };
}
