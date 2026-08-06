import {
  ICleanYearPeriod,
  ICleanMonthPeriod,
} from './interfaces/cleanReportTree.interface.js';
import {
  IYearsPeriod,
  IReport,
} from '../../../../database/interfaces/reportsTree.interface.js';

export var cleanReportTree = (years: IYearsPeriod[]): ICleanYearPeriod[] => {
  return years
    .map(({ year, months }) => {
      var cleanMonths: ICleanMonthPeriod[] = (months || [])
        .filter(
          (item): item is NonNullable<typeof item> =>
            item !== null && item !== undefined,
        )
        .filter((item) => {
          if (!item.month) {
            return false;
          }

          if (!item.reportIds || item.reportIds.length === 0) {
            return false;
          }

          return !item.reportIds.every((report) => report === null);
        })
        .map(({ month, reportIds }) => ({
          month: month!,
          reportIds: reportIds!.filter(
            (report): report is IReport => report !== null,
          ),
        }));

      return {
        year,
        months: cleanMonths,
      };
    })
    .filter((year) => year.months.length > 0);
};
