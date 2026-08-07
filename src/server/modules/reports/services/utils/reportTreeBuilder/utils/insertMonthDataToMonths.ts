import { IMonthPeriod } from '../../../../../../database/interfaces/reportsTree.interface.js';

import { getMonthNameAndIndex } from './getMonthNameAndIndex.js';
import {
  IFullPeriod,
  insertReportIdAndFullPeriodToReportIds,
} from './insertReportIdAndFullPeriodToReportIds.js';

export var insertMonthDataToMonths = (
  reportId: number,
  fullPeriod: IFullPeriod,
  date: string,
  overlapStatus?: string,
): IMonthPeriod[] => {
  var reportIds = insertReportIdAndFullPeriodToReportIds(
    date,
    fullPeriod,
    reportId,
    overlapStatus,
  );
  var monthNum = +date.split('-')[1];
  var { monthName, monthIndex } = getMonthNameAndIndex(monthNum);
  var months = new Array(12).fill(null);
  months[monthIndex] = { month: monthName, reportIds };
  return months;
};
