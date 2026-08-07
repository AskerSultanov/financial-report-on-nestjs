import { getMonthNameAndIndex } from './getMonthNameAndIndex.js';
import {
  IMonthPeriod,
  IYearsPeriod,
} from '../../../../../../database/interfaces/reportsTree.interface.js';
import {
  IFullPeriod,
  insertReportIdAndFullPeriodToReportIds,
} from './insertReportIdAndFullPeriodToReportIds.js';

/**
 * @param {'overlap - yes' | 'overlap - no'} overlapStatus
 */

export var updateYearStructure = (
  months: IMonthPeriod[],
  year: number,
  monthNum: number,
  reportDate: string,
  reportId: number,
  fullPeriod: IFullPeriod,
  overlapStatus: string,
): IYearsPeriod => {
  var { monthName, monthIndex } = getMonthNameAndIndex(monthNum);

  var reportIds = months[monthIndex]?.reportIds ?? new Array(5).fill(null);

  reportIds = insertReportIdAndFullPeriodToReportIds(
    reportDate,
    fullPeriod,
    reportId,
    overlapStatus,
    reportIds,
  );

  months[monthIndex] = { month: monthName, reportIds };

  return { year, months };
};
