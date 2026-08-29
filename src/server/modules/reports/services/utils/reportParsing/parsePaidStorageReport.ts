import { IPaidStorageReportItem } from '../WBAPI/interfaces/getReports.interface.js';
import { getSkuNamesFromPaidStorageReport } from './getSKUNamesFromPaidStorageReport.js';

export interface ParsedPaidStorageReportResult {
  name: string;
  skuStorageCost: number;
}

export function parsePaidStorageReport(
  paidStorageReport: IPaidStorageReportItem[],
): { parsedPaidStorageReport: ParsedPaidStorageReportResult[] } {
  var parsedPaidStorageReport: ParsedPaidStorageReportResult[] = [];

  if (!paidStorageReport.length) {
    return { parsedPaidStorageReport };
  }

  var { skuNamesFromPaidStorageReport } =
    getSkuNamesFromPaidStorageReport(paidStorageReport);

  for (var name of skuNamesFromPaidStorageReport) {
    var { skuStorageCost } = this.calcUtils.storageCostFromPaidStorageReport(
      paidStorageReport,
      name,
    );

    parsedPaidStorageReport.push({ name, skuStorageCost });
  }

  return { parsedPaidStorageReport };
}
