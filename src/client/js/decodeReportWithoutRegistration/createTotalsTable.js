import createTdElement from "../report/table/services/createTdElement.js";

var createTotalsTable = (report, reportPeriodYear, isCrossYearPeriod, reportSummaryLabelText, postfix) => {
  var tableRow = document.createElement("tr");

  var totalRetailAmountTd = createTdElement(report.totalRetailAmount);
  var totalSoldTd = createTdElement(report.totalSold);
  var totalReturnAmountTd = createTdElement(report.totalReturnAmount);
  var totalSellerPayoutAmountTd = createTdElement(report.totalSellerPayoutAmount);
  var totalDeductionOrPaymentTd = createTdElement(report.totalDeductionOrPayment);
  var totalStorageCostTd = createTdElement(report.totalStorageCost);
  var totalProductCostsTd = createTdElement(report.totalProductCosts);
  var totalDeliveryCostTd = createTdElement(report.totalDeliveryCost);
  var totalPaidAcceptanceTd = createTdElement(report.totalPaidAcceptance);

  var totalOtherExpensesTdId = "totalOtherExpenses" + postfix + "-" + reportPeriodYear;
  var totalOtherExpensesTd = createTdElement(report.totalOtherExpenses, totalOtherExpensesTdId);

  var totalProfitMarginTdId = "totalProfitMargin" + postfix + "-" + reportPeriodYear;
  var totalProfitMarginTd = createTdElement(report.totalProfitMargin, totalProfitMarginTdId);

  var totalFinesTd = createTdElement(report.totalFines);
  var totalAdvertisingCosts = createTdElement(report.totalAdvertisingCosts);
  var totalTaxAmountTd = createTdElement(report.totalTaxAmount);

  var totalFinalProfitTdId = "totalFinalProfit" + postfix + "-" + reportPeriodYear;
  var totalFinalProfitTd = createTdElement(report.totalFinalProfit, totalFinalProfitTdId);

  if (+report.totalFinalProfit < 0) {
    totalFinalProfitTd.style.color = "red";
  }

  tableRow.append(
    totalRetailAmountTd,
    totalSoldTd,
    totalReturnAmountTd,
    totalSellerPayoutAmountTd,
    totalProductCostsTd,
    totalOtherExpensesTd,
    totalDeliveryCostTd,
    totalPaidAcceptanceTd,
    totalFinesTd,
    totalDeductionOrPaymentTd,
    totalStorageCostTd,
    totalAdvertisingCosts,
    totalTaxAmountTd,
    totalProfitMarginTd,
    totalFinalProfitTd,
  );

  var tableBody = document.createElement("tbody");
  tableBody.append(tableRow);
  tableBody.id = "table-body-" + reportPeriodYear;

  var { tableHead } = createTotalsTableHead(reportPeriodYear);

  var table = document.createElement("table");
  table.id = "totals-table-" + reportPeriodYear;

  table.append(tableHead, tableBody);

  var tablesContainer = document.getElementById("tables-container");

  if (isCrossYearPeriod) {
    var { reportSummaryLabel } = createReportSummaryLabel(reportSummaryLabelText);
    tablesContainer.append(reportSummaryLabel, table);
  } else {
    tablesContainer.append(table);
  }
};

var tableHeadContent = `
        <th>WB реализовал</th>
        <th>Продано шт.</th>
        <th>Возвратов</th>
        <th>К перечислению продавцу</th>
        <th>Себестоимость проданного товара</th>
        <th>Прочие расходы</th>
        <th>Доставка</th>
        <th>Приёмка</th>
        <th>Штрафы</th>
        <th>Удержания/Выплаты</th>
        <th>Хранение</th>
        <th>Реклама</th>
        <th>Налоги</th>
        <th>Маржинальность %</th>
        <th>Итого</th>
`;

function createTotalsTableHead() {
  var tableHead = document.createElement("thead");
  tableHead.innerHTML = tableHeadContent;

  return { tableHead };
}

function createReportSummaryLabel(reportSummaryLabelText) {
  var reportSummaryLabel = document.createElement("span");
  reportSummaryLabel.className = "report-summary-label";
  reportSummaryLabel.textContent = "Сводка " + reportSummaryLabelText;

  var reportSummaryLabelWrapper = document.createElement("div");
  reportSummaryLabelWrapper.className = "report-summary-label-wrapper";
  reportSummaryLabelWrapper.append(reportSummaryLabel);

  return { reportSummaryLabel: reportSummaryLabelWrapper };
}

export default createTotalsTable;
