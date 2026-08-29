import { ISku } from '../../../interfaces/reportSku.interface.js';

export interface IUpdatedReportSkus {
  skuName: string;
  data: ISku;
}

export interface IUpdatedReport {
  reportId: number;
  updatedSkus: IUpdatedReportSkus[];
}
