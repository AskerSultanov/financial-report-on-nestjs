var mainReportType: number = 1;
var buybackReportType: number = 2;
var eaeuCountries: string[] = [
  'Армения',
  'Беларусь',
  'Казахстан',
  'Кыргызстан',
];

import { ISkuNamesAndIds } from './getSkuNamesAndIds.js';
import { IWeeklyFinancialReportItem } from '../WBAPI/interfaces/getReports.interface.js';
import { IRawRequiredColumnsNameToWeeklyFinancialReport } from './getRequiredColumnsNameFromWeeklyFinanfialReportFile.js';

interface IAvrgStorageDataForEachSku {
  vendorCode: string;
  warehousePrice: number;
}

export var aggregateSkuData = (
  workSheet: any,
  skuNamesAndIds: ISkuNamesAndIds[],
  reportId: number,
  requiredColumnsName: IRawRequiredColumnsNameToWeeklyFinancialReport,
  dateFrom: string,
  dateTo: string,
  avrgStorageCostForEachItem: number = 0,
): {
  skus: IWeeklyFinancialReportItem[];
  avrgStorageDataForEachSku: IAvrgStorageDataForEachSku[];
} => {
  var skus: IWeeklyFinancialReportItem[] = [];
  var avrgStorageDataForEachSku: IAvrgStorageDataForEachSku[] = [];

  for (var { skuId, skuName, rowNums } of skuNamesAndIds) {
    for (var rowNum of rowNums) {
      var sku: IWeeklyFinancialReportItem = {};

      sku.nmId = skuId;
      sku.reportId = reportId;
      sku.vendorCode = skuName;
      sku.dateFrom = dateFrom;
      sku.dateTo = dateTo;

      var qtyCellAddress: string = requiredColumnsName.qtyColumn! + rowNum;
      var finesCellAddress: string = requiredColumnsName.finesColumn! + rowNum;
      var countryCellAddress: string =
        requiredColumnsName.countryColumn! + rowNum;
      var saleDateCellAddress: string =
        requiredColumnsName.saleDateColumn! + rowNum;
      var retailPriceCellAddress: string =
        requiredColumnsName.retailPriceColumn! + rowNum;
      var docTypeNameCellAddress: string =
        requiredColumnsName.docTypeNameColumn! + rowNum;
      var forPayCellAddress: string =
        requiredColumnsName.sellerPayoutAmountColumn! + rowNum;
      var retailAmountCellAddress: string =
        requiredColumnsName.retailAmountColumn! + rowNum;
      var deliveryCostCellAddress: string =
        requiredColumnsName.deliveryCostColumn! + rowNum;
      var paidAcceptanceCellAddress: string =
        requiredColumnsName.paidAcceptanceColumn! + rowNum;
      var additionalPaymentCellAddress: string =
        requiredColumnsName.additionalPaymentColumn! + rowNum;
      var deductionOrPaymentCellAddress: string =
        requiredColumnsName.deductionOrPaymentColumn! + rowNum;

      sku.paidStorage = avrgStorageCostForEachItem + '';
      sku.quantity = workSheet.getCell(qtyCellAddress).value || 0;
      sku.penalty = workSheet.getCell(finesCellAddress).value || 0;
      sku.forPay = workSheet.getCell(forPayCellAddress).value || 0;
      sku.saleDt = workSheet.getCell(saleDateCellAddress).value || 0;
      sku.retailPrice = workSheet.getCell(retailPriceCellAddress).value || 0;
      sku.docTypeName = workSheet.getCell(docTypeNameCellAddress).value || '';
      sku.retailAmount = workSheet.getCell(retailAmountCellAddress).value || 0;
      sku.deliveryService =
        workSheet.getCell(deliveryCostCellAddress).value || 0;
      sku.deduction =
        workSheet.getCell(deductionOrPaymentCellAddress).value || 0;
      sku.paidAcceptance =
        workSheet.getCell(paidAcceptanceCellAddress).value || 0;
      sku.additionalPayment =
        workSheet.getCell(additionalPaymentCellAddress).value || 0;

      var countryName = workSheet.getCell(countryCellAddress).value;
      sku.reportType = eaeuCountries.includes(countryName)
        ? buybackReportType
        : mainReportType;

      skus.push(sku);
    }

    var storageCostPerSku: number = avrgStorageCostForEachItem * rowNums.length;

    avrgStorageDataForEachSku.push({
      vendorCode: skuName,
      warehousePrice: storageCostPerSku,
    });
  }

  return { skus, avrgStorageDataForEachSku };
};
