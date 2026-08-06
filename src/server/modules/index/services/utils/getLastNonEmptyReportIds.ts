import { ICleanYearPeriod } from './interfaces/cleanReportTree.interface.js';

export var getLastNonEmptyReportIds = (
  lastYear: ICleanYearPeriod,
): number[] | [] | undefined => {
  return lastYear.months
    .find((item) => item?.reportIds.length)
    ?.reportIds.map(({ reportId }) => reportId);
};
