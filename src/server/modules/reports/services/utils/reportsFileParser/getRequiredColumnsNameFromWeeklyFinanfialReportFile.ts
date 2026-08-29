var expectedQtyTitleColumnName: string = 'N';
var expectedCountryTitleName: string = 'AY';
var expectedFinesTitleColumnName: string = 'AO';
var expectedOrderDateTitleColumnName: string = 'L';
var expectedSaleDateTitleColumnName: string = 'M';
var expectedDocTypeNameTitleColumnName: string = 'J';
var expectedRetailPriceTitleColumnName: string = 'O';
var expectedRetailAmountTitleColumnName: string = 'P';
var expectedStorageCostTitleColumnName: string = 'BH';
var expectedReturnAmountTitleColumnName: string = 'AJ';
var expectedDeliveryCostTitleColumnName: string = 'AK';
var expectedPaidAcceptanceTitleColumnName: string = 'BJ';
var expectedAdditionalPaymentTitleColumnName: string = 'AP';
var expectedSellerPayoutAmountTitleColumnName: string = 'AH';
var expectedDeductionOrPaymentTitleColumnName: string = 'BI';

var qtyTitleText: string = 'Кол-во';
var countryTitleText: string = 'Страна';
var storageCostTitleText: string = 'Хранение';
var saleDateTitleText: string = 'Дата продажи';
var finesTitleText: string = 'Общая сумма штрафов';
var docTypeNameTitleText: string = 'Тип документа';
var retailPriceTitleText: string = 'Цена розничная';
var deductionOrPaymentTitleText: string = 'Удержания';
var returnAmountTitleText: string = 'Количество возврата';
var orderDateTitleText: string = 'Дата заказа покупателем';
var paidAcceptanceTitleText: string = 'Операции на приемке';
var retailAmountTitleText: string = 'Вайлдберриз реализовал Товар (Пр)';
var deliveryCostTitleText: string = 'Услуги по доставке товара покупателю';
var additionalPaymentTitleText: string =
  'Корректировка Вознаграждения Вайлдберриз (ВВ)';
var sellerPayoutAmountTitleText: string =
  'К перечислению Продавцу за реализованный Товар';
var titlesRowNum = 1;

export interface ITopCells {
  colName: string;
  colTitle: string;
}

export interface IRawRequiredColumnsNameToWeeklyFinancialReport {
  qtyColumn?: string;
  finesColumn?: string;
  countryColumn?: string;
  saleDateColumn?: string;
  orderDateColumn?: string;
  retailPriceColumn?: string;
  storageCostColumn?: string;
  docTypeNameColumn?: string;
  deliveryCostColumn?: string;
  returnAmountColumn?: string;
  retailAmountColumn?: string;
  paidAcceptanceColumn?: string;
  additionalPaymentColumn?: string;
  deductionOrPaymentColumn?: string;
  sellerPayoutAmountColumn?: string;
}

export function getRequiredColumnsNameFromWeeklyFinanfialReportFile(
  workSheet: any,
  columnsNames: string[],
): { requiredColumnsName: IRawRequiredColumnsNameToWeeklyFinancialReport } {
  var topCells: ITopCells[] = [];

  for (var colName of columnsNames) {
    var cellAddress = colName + titlesRowNum;
    var colTitle = workSheet.getCell(cellAddress).value;
    topCells.push({ colName, colTitle });
  }

  if (!topCells.length) {
    return { requiredColumnsName: {} };
  }

  var requiredColumnsName: IRawRequiredColumnsNameToWeeklyFinancialReport = {};

  var qtyColumnExistInWS: boolean =
    workSheet.getCell(expectedQtyTitleColumnName + titlesRowNum).value ===
    qtyTitleText;

  var qtyColumn: string | undefined;

  if (!qtyColumnExistInWS) {
    qtyColumn = topCells?.find((col) => col.colTitle === qtyTitleText)?.colName;
  } else {
    qtyColumn = expectedQtyTitleColumnName;
  }

  if (qtyColumn) {
    requiredColumnsName.qtyColumn = qtyColumn;
  }

  var countryColumnExistInWS =
    workSheet.getCell(expectedCountryTitleName + titlesRowNum).value ===
    countryTitleText;

  var countryColumn: string | undefined;
  if (!countryColumnExistInWS) {
    countryColumn = topCells?.find(
      (col) => col.colTitle === countryTitleText,
    )?.colTitle;
  } else {
    countryColumn = expectedCountryTitleName;
  }
  if (countryColumn) {
    requiredColumnsName.countryColumn = countryColumn;
  }

  var saleDateColumnExistInWS =
    workSheet.getCell(expectedSaleDateTitleColumnName + titlesRowNum).value ===
    saleDateTitleText;

  var saleDateColumn: string | undefined;
  if (!saleDateColumnExistInWS) {
    saleDateColumn = topCells?.find(
      (col) => col.colTitle === saleDateTitleText,
    )?.colName;
  } else {
    saleDateColumn = expectedSaleDateTitleColumnName;
  }
  if (saleDateColumn) {
    requiredColumnsName.saleDateColumn = saleDateColumn;
  }

  var storageCostColumnExistInWS = (workSheet.getCell(
    expectedStorageCostTitleColumnName + titlesRowNum,
  ).value = storageCostTitleText);

  var storageCostColumn: string | undefined;
  if (!storageCostColumnExistInWS) {
    storageCostColumn = topCells?.find(
      (col) => col.colTitle === storageCostTitleText,
    )?.colName;
  } else {
    storageCostColumn = expectedStorageCostTitleColumnName;
  }
  if (storageCostColumn) {
    requiredColumnsName.storageCostColumn = storageCostColumn;
  }

  var docTypeNameColumnExistInWS =
    workSheet.getCell(expectedDocTypeNameTitleColumnName + titlesRowNum)
      .value === docTypeNameTitleText;

  var docTypeNameColumn: string | undefined;

  if (!docTypeNameColumnExistInWS) {
    docTypeNameColumn = topCells?.find(
      (col) => col.colTitle === docTypeNameTitleText,
    )?.colName;
  } else {
    docTypeNameColumn = expectedDocTypeNameTitleColumnName;
  }
  if (docTypeNameColumn) {
    requiredColumnsName.docTypeNameColumn = docTypeNameColumn;
  }

  var finesColumnExistInWS =
    workSheet.getCell(expectedFinesTitleColumnName + titlesRowNum).value ===
    finesTitleText;

  var finesColumn: string | undefined;

  if (!finesColumnExistInWS) {
    finesColumn = topCells?.find(
      (col) => col.colTitle === finesTitleText,
    )?.colName;
  } else {
    finesColumn = expectedFinesTitleColumnName;
  }
  if (finesColumn) {
    requiredColumnsName.finesColumn = finesColumn;
  }

  var retailPriceColumnExistInWS =
    workSheet.getCell(expectedRetailPriceTitleColumnName + titlesRowNum)
      .value === retailPriceTitleText;

  var retailPriceColumn: string | undefined;

  if (!retailPriceColumnExistInWS) {
    retailPriceColumn = topCells?.find(
      (col) => col.colTitle === retailPriceTitleText,
    )?.colName;
  } else {
    retailPriceColumn = expectedRetailPriceTitleColumnName;
  }
  if (retailPriceColumn) {
    requiredColumnsName.retailPriceColumn = retailPriceColumn;
  }

  var deductionOrPaymentColumnExistInWS =
    workSheet.getCell(expectedDeductionOrPaymentTitleColumnName + titlesRowNum)
      .value === deductionOrPaymentTitleText;

  var deductionOrPaymentColumn: string | undefined;

  if (!deductionOrPaymentColumnExistInWS) {
    deductionOrPaymentColumn = topCells?.find(
      (col) => col.colTitle === deductionOrPaymentTitleText,
    )?.colName;
  } else {
    deductionOrPaymentColumn = expectedDeductionOrPaymentTitleColumnName;
  }
  if (deductionOrPaymentColumn) {
    requiredColumnsName.deductionOrPaymentColumn = deductionOrPaymentColumn;
  }

  var returnAmountColumnExistInWS =
    workSheet.getCell(expectedReturnAmountTitleColumnName + titlesRowNum)
      .value === returnAmountTitleText;

  var returnAmountColumn: string | undefined;

  if (!returnAmountColumnExistInWS) {
    returnAmountColumn = topCells?.find(
      (col) => col.colTitle === returnAmountTitleText,
    )?.colName;
  } else {
    returnAmountColumn = expectedReturnAmountTitleColumnName;
  }
  if (returnAmountColumn) {
    requiredColumnsName.returnAmountColumn = returnAmountColumn;
  }

  var orderDateColumnExistInWS =
    workSheet.getCell(expectedOrderDateTitleColumnName + titlesRowNum).value ===
    orderDateTitleText;

  var orderDateColumn: string | undefined;

  if (!orderDateColumnExistInWS) {
    orderDateColumn = topCells?.find(
      (col) => col.colTitle === orderDateTitleText,
    )?.colName;
  } else {
    orderDateColumn = expectedOrderDateTitleColumnName;
  }
  if (orderDateColumn) {
    requiredColumnsName.orderDateColumn = orderDateColumn;
  }

  var paidAcceptanceColumnExistInWS =
    workSheet.getCell(expectedPaidAcceptanceTitleColumnName + titlesRowNum)
      .value === paidAcceptanceTitleText;

  var paidAcceptanceColumn: string | undefined;

  if (!paidAcceptanceColumnExistInWS) {
    paidAcceptanceColumn = topCells?.find(
      (col) => col.colTitle === paidAcceptanceTitleText,
    )?.colName;
  } else {
    paidAcceptanceColumn = expectedPaidAcceptanceTitleColumnName;
  }
  if (paidAcceptanceColumn) {
    requiredColumnsName.paidAcceptanceColumn = paidAcceptanceColumn;
  }

  var retailAmountColumnExistInWS =
    workSheet.getCell(expectedRetailAmountTitleColumnName + titlesRowNum)
      .value === retailAmountTitleText;

  var retailAmountColumn: string | undefined;

  if (!retailAmountColumnExistInWS) {
    retailAmountColumn = topCells?.find(
      (col) => col.colTitle === retailAmountTitleText,
    )?.colName;
  } else {
    retailAmountColumn = expectedRetailAmountTitleColumnName;
  }
  if (retailAmountColumn) {
    requiredColumnsName.retailAmountColumn = retailAmountColumn;
  }

  var deliveryCostColumnExistInWS =
    workSheet.getCell(expectedDeliveryCostTitleColumnName + titlesRowNum)
      .value === deliveryCostTitleText;

  var deliveryCostColumn: string | undefined;

  if (!deliveryCostColumnExistInWS) {
    deliveryCostColumn = topCells?.find(
      (col) => col.colTitle === deliveryCostTitleText,
    )?.colName;
  } else {
    deliveryCostColumn = expectedDeliveryCostTitleColumnName;
  }
  if (deliveryCostColumn) {
    requiredColumnsName.deliveryCostColumn = deliveryCostColumn;
  }

  var additionalPaymentColumnExistInWS =
    workSheet.getCell(expectedAdditionalPaymentTitleColumnName + titlesRowNum)
      .value === additionalPaymentTitleText;

  var additionalPaymentColumn: string | undefined;

  if (!additionalPaymentColumnExistInWS) {
    additionalPaymentColumn = topCells?.find(
      (col) => col.colTitle === additionalPaymentTitleText,
    )?.colName;
  } else {
    additionalPaymentColumn = expectedAdditionalPaymentTitleColumnName;
  }
  if (additionalPaymentColumn) {
    requiredColumnsName.additionalPaymentColumn = additionalPaymentColumn;
  }

  var sellerPayoutAmountColumnExistInWS =
    workSheet.getCell(expectedSellerPayoutAmountTitleColumnName + titlesRowNum)
      .value === sellerPayoutAmountTitleText;

  var sellerPayoutAmountColumn: string | undefined;

  if (!sellerPayoutAmountColumnExistInWS) {
    sellerPayoutAmountColumn = topCells?.find(
      (col) => col.colTitle === sellerPayoutAmountTitleText,
    )?.colName;
  } else {
    sellerPayoutAmountColumn = expectedSellerPayoutAmountTitleColumnName;
  }
  if (sellerPayoutAmountColumn) {
    requiredColumnsName.sellerPayoutAmountColumn = sellerPayoutAmountColumn;
  }

  return { requiredColumnsName };
}
