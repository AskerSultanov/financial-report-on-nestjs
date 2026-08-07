import { getMondayIndex } from './getMondayIndex.js';
import { getMondaysOrSundaysOfMonth } from './getMondaysOrSundaysOfMonth.js';
import { IReport } from '../../../../../../database/interfaces/reportsTree.interface.js';
/**
 * @param {'overlap - yes' | 'overlap - no'} overlapStatus
 */

export interface IFullPeriod {
  dateFrom: string;
  dateTo: string;
}

export var insertReportIdAndFullPeriodToReportIds = (
  date: string,
  fullPeriod: IFullPeriod,
  reportId: number,
  overlapStatus?: string,
  existReportIds: IReport[] | null[] | undefined = [],
): IReport[] => {
  var reportIds;

  if (!existReportIds || !existReportIds.length) {
    reportIds = new Array(5).fill(null);
  } else {
    reportIds = existReportIds;
  }

  var mondays = getMondaysOrSundaysOfMonth(date, 'monday').weekDays;

  mondays.reverse();

  if (overlapStatus === 'overlap - yes') {
    reportIds[mondays.length] = { reportId, ...fullPeriod };
  } else {
    var { mondayIndex } = getMondayIndex(date, mondays);
    reportIds[mondayIndex] = { reportId, ...fullPeriod };
  }

  return reportIds;
};
