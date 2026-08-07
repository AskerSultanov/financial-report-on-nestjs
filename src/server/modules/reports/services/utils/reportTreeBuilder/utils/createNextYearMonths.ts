import {
  IReport,
  IMonthPeriod,
} from '../../../../../../database/interfaces/reportsTree.interface.js';

export var createNextYearMonths = (reportIds: IReport[]): IMonthPeriod[] => {
  var firstMonthIndex = 11;
  var firstMonthName = 'январь';

  var months = new Array(12).fill(null);

  months[firstMonthIndex] = { month: firstMonthName, reportIds };

  return months;
};
