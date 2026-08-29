var expectedDateColumnName: string = 'A';
var expectedSkuIdColumnName: string = 'Q';
var expectedSkuNameColumnName: string = 'P';
var expectedWarehousePriceColumnName: string = 'T';

var dateTitleText: string = 'Дата';
var skuIdTitleText: string = 'Артикул WB';
var skuNameTitleText: string = 'Артикул продавца';
var warehousePriceTitleText: string = 'Сумма хранения, руб';

var titlesRowNum: number = 2;

export interface IRawRequiredColumnsNameToPaidStorageReport {
  dateColumn?: string;
  skuIdColumn?: string;
  skuNameColumn?: string;
  warehousePriceColumn?: string;
}

export interface ITopCells {
  colName: string;
  colTitle: string;
}

export var getRequiredColumnsNameFromPaidStorageReportFile = (
  workSheet: any,
  columnsNames: string[],
): { requiredColumnsName: IRawRequiredColumnsNameToPaidStorageReport } => {
  var topCells: ITopCells[] = [];
  var requiredColumnsName: IRawRequiredColumnsNameToPaidStorageReport = {};

  for (var colName of columnsNames) {
    var cellAddress = colName + titlesRowNum;
    var colTitle = workSheet.getCell(cellAddress).value;
    topCells.push({ colName, colTitle });
  }

  var dateColumnExistInWS =
    workSheet.getCell(expectedDateColumnName + titlesRowNum).value ===
    dateTitleText;

  var dateColumn: string | undefined;

  if (!dateColumnExistInWS) {
    dateColumn = topCells?.find(
      (topCell) => topCell.colTitle === dateTitleText,
    )?.colName;
  } else {
    dateColumn = expectedDateColumnName;
  }

  if (dateColumn) {
    requiredColumnsName.dateColumn = dateColumn;
  }

  var skuIdColumnExistInWS =
    workSheet.getCell(expectedSkuIdColumnName + titlesRowNum).value ===
    skuIdTitleText;

  var skuIdColumn: string | undefined;

  if (!skuIdColumnExistInWS) {
    skuIdColumn = topCells?.find(
      (topCell) => topCell.colTitle === skuIdTitleText,
    )?.colName;
  } else {
    skuIdColumn = expectedSkuIdColumnName;
  }

  if (skuIdColumn) {
    requiredColumnsName.skuIdColumn = skuIdColumn;
  }

  var skuNameColumnExistInWS =
    workSheet.getCell(expectedSkuNameColumnName + titlesRowNum).value ===
    skuNameTitleText;

  var skuNameColumn: string | undefined;

  if (skuNameColumnExistInWS) {
    skuNameColumn = topCells?.find(
      (topCell) => topCell.colTitle === skuNameTitleText,
    )?.colName;
  } else {
    skuNameColumn = expectedSkuNameColumnName;
  }

  if (skuNameColumn) {
    requiredColumnsName.skuNameColumn = skuNameColumn;
  }

  var warehousePriceColumnExistInWS =
    workSheet.getCell(expectedWarehousePriceColumnName + titlesRowNum).value ===
    warehousePriceTitleText;

  var warehousePriceColumn: string | undefined;

  if (warehousePriceColumnExistInWS) {
    requiredColumnsName.warehousePriceColumn = topCells?.find(
      (topCell) => topCell.colTitle === warehousePriceTitleText,
    )?.colName;
  } else {
    warehousePriceColumn = expectedWarehousePriceColumnName;
  }

  if (warehousePriceColumn) {
    requiredColumnsName.warehousePriceColumn = warehousePriceColumn;
  }

  return { requiredColumnsName };
};
