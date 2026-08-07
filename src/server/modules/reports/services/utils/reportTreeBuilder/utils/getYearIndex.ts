import { IYearsPeriod } from '../../../../../../database/interfaces/reportsTree.interface.js';

export var getYearIndex = (years: IYearsPeriod[], year: number): number =>
  years?.findIndex((date) => date.year === year);
