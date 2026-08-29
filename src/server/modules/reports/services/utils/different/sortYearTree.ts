import { IYearsPeriod } from '../../../../../database/interfaces/reportsTree.interface.js';

export var sortYearsTree = (years: IYearsPeriod[]) =>
  years.sort((a, b) => b.year - a.year);
