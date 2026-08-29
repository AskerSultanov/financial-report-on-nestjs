import { IPaidStorageReportItem } from '../WBAPI/interfaces/getReports.interface.js';

export function getSkuNamesFromPaidStorageReport(
  paidStorageReport: IPaidStorageReportItem[],
): { skuNamesFromPaidStorageReport: string[] } {
  var skuNamesFromPaidStorageReport: string[] = [];

  if (!paidStorageReport.length) {
    return { skuNamesFromPaidStorageReport };
  }

  for (var elem of paidStorageReport) {
    if (!skuNamesFromPaidStorageReport.includes(elem.vendorCode)) {
      skuNamesFromPaidStorageReport.push(elem.vendorCode);
    }
  }

  return { skuNamesFromPaidStorageReport };
}
