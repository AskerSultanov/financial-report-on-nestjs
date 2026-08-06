import createTdElement from "./services/createTdElement.js";

var createTotalsTable = (report, reportPeriodYear, isCrossYearPeriod, reportSummaryLabelText, postfix) => {
  var tableRow = document.createElement("tr");

  var reportPeriodYearTd = createTdElement(reportPeriodYear);
  var totalRetailAmountTd = createTdElement(report.totalRetailAmount);
  var totalSellerPayoutAmountTd = createTdElement(report.totalSellerPayoutAmount);
  var totalProductCostsTd = createTdElement(report.totalProductCosts);

  var totalOtherExpensesTdId = "totalOtherExpenses" + postfix + "-" + reportPeriodYear;
  var totalOtherExpensesTd = createTdElement(report.totalOtherExpenses, totalOtherExpensesTdId);

  var totalDeductionOrPaymentTd = createTdElement(report.totalDeductionOrPayment);
  var totalStorageCostTd = createTdElement(report.totalStorageCost);
  var totalDeliveryCostTd = createTdElement(report.totalDeliveryCost);
  var totalPaidAcceptanceTd = createTdElement(report.totalPaidAcceptance);

  var totalProfitMarginTdId = "totalProfitMargin" + postfix + "-" + reportPeriodYear;
  var totalProfitMarginTd = createTdElement(report.totalProfitMargin, totalProfitMarginTdId);

  var totalSoldTd = createTdElement(report.totalSold);
  var totalReturnAmountTd = createTdElement(report.totalReturnAmount);
  var totalFinesTd = createTdElement(report.totalFines);
  var totalAdvertisingCostsTd = createTdElement(report.totalAdvertisingCosts);
  var totalTaxAmountTd = createTdElement(report.totalTaxAmount);

  var totalInsuranceFeeTdId = "totalInsuranceFee" + postfix + "-" + reportPeriodYear;
  var totalInsuranceFeeTd = createTdElement(report.totalInsuranceFee, totalInsuranceFeeTdId);

  var totalAdditionalInsuranceFeeTd = createTdElement(report.totalAdditionalInsuranceFee);

  var totalFinalProfitTdId = "totalFinalProfit" + postfix + "-" + reportPeriodYear;
  var totalFinalProfitTd = createTdElement(report.totalFinalProfit, totalFinalProfitTdId);

  if (report.totalFinalProfit < 0) {
    totalFinalProfitTd.style.color = "red";
  }

  if (report.totalProfitMargin < 0) {
    totalProfitMarginTd.style.color = "red";
  }

  tableRow.append(
    reportPeriodYearTd,
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
    totalAdvertisingCostsTd,
    totalTaxAmountTd,
    totalInsuranceFeeTd,
    totalAdditionalInsuranceFeeTd,
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

export default createTotalsTable;

var tableHeadContent = `
            <th>Отчётный год</th>
            <th>WB реализовал</th>
            <th>Продано шт.</th>
            <th>Возвратов</th>
            <th>Перечисления продавцу</th>
            <th>Себестоимость товаров</th>
            <th>Прочие расходы</th>
            <th>Доставка</th>
            <th>Приёмка</th>
            <th>Штрафы</th>
            <th>Удержания/Выплаты</th>
            <th>Хранение</th>
            <th>Реклама</th>
            <th>Налоги</th>
            <th>Страховые взносы</th>
            <th>Доп. страховые взносы</th>
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
