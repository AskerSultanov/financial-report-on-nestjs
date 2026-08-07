import { IYearsPeriod } from '../../../../../../database/interfaces/reportsTree.interface.js';

export var checkYearExists = (
  years: IYearsPeriod[],
  year: number,
): IYearsPeriod | undefined => years.find((date) => date.year === year);
