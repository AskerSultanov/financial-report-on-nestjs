import { IPaidStorageReportItem } from '../../WBAPI/interfaces/getReports.interface.js';

export function calcSkuStorageCostFromPaidStorageReport(
  report: IPaidStorageReportItem[],
  skuName: string,
): number {
  var filteredSku: IPaidStorageReportItem[] = report.filter(
    (e) => e.vendorCode == skuName && e.warehousePrice,
  );

  var storageCost: number = filteredSku.reduce(
    (acc, item) => acc + item?.warehousePrice!,
    0,
  );

  return storageCost;
}
