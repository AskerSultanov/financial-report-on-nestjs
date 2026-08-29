import { IPaidStorageReports } from './extractWorkSheetFromFile.js';
import { IPaidStorageReportItem } from '../WBAPI/interfaces/getReports.interface.js';

export var aggregatePaidStorageReportData = (
  paidStorageReports: IPaidStorageReports[],
): { paidStorageReport: IPaidStorageReportItem[] } => {
  var paidStorageReport: IPaidStorageReportItem[] = [];

  if (!paidStorageReports) {
    return { paidStorageReport };
  }

  for (var { workSheet, workSheetData } of paidStorageReports) {
    var startRowNum: number = 3;

    var { requiredColumnsName } = workSheetData;

    while (startRowNum <= workSheet.actualRowCount) {
      var dateCellAddress: string =
        requiredColumnsName.dateColumn! + startRowNum;
      var skuIdCellAddress: string =
        requiredColumnsName.skuIdColumn! + startRowNum;
      var skuNameCellAddress: string =
        requiredColumnsName.skuNameColumn! + startRowNum;
      var warehousePriceCellAddress: string =
        requiredColumnsName.warehousePriceColumn! + startRowNum;

      var date: string | undefined = workSheet.getCell(dateCellAddress)?.value;
      var nmId: number | undefined =
        workSheet.getCell(skuIdCellAddress)?.value || 0;
      var vendorCode: string | undefined =
        workSheet.getCell(skuNameCellAddress)?.value || 0;
      var warehousePrice: number | undefined =
        workSheet.getCell(warehousePriceCellAddress)?.value || 0;

      if (date && nmId && vendorCode && warehousePrice) {
        paidStorageReport.push({ date, nmId, vendorCode, warehousePrice });
      }

      startRowNum++;
    }
  }

  return { paidStorageReport };
};
