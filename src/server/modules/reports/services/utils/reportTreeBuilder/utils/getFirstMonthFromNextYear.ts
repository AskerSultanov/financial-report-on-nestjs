import { IMonthPeriod } from '../../../../../../database/interfaces/reportsTree.interface.js';

export var getFirstMonthFromNextYear = (
  months: IMonthPeriod[] | null[],
): IMonthPeriod =>
  months[11] ?? { month: 'январь', reportIds: new Array(5).fill(null) };
