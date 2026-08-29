import { ISku } from './reportSku.interface.js';
import { IRecordedTo } from './recordedTo.interface.js';

export interface IReport {
  userId: string;
  reportId: number;
  dateFrom: string;
  dateTo: string;
  recordedTo: IRecordedTo;
  buybackReportIsExist?: boolean;
  isCrossYearPeriod: boolean;
  isFinancesAccounted: boolean;
  reportIsEmpty: boolean;
  skus: ISku[];
}
