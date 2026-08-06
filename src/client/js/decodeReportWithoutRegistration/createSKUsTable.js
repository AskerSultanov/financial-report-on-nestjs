import createTdElement from "../report/table/services/createTdElement.js";
import openCostPriceModal from "../report/table/services/modal/openCostPriceModal.js";
import openOtherExpensesModal from "../report/table/services/modal/openOtherExpensesModal.js";

var isGuestAccess = true;

var createSKUsTable = (report, postfix, reportPeriodYear) => {
  var skuIndex = 0;
  var tableBody = document.createElement("tbody");

  var { userId, reportId, skus } = report;

  for (var sku of skus) {
    var tableRow = document.createElement("tr");
    var skuName = createTdElement(sku.skuName);
    var qty = createTdElement(sku.qty);
    var returnAmount = createTdElement(sku.returnAmount);

    var data = {
      userId,
      reportId,
      skuIndex,
      skuId: sku.id,
      skuName: sku.skuName,
      year: reportPeriodYear,
      taxRate: report.taxRate,
      dateFrom: report.dateFrom,
      dateTo: report.dateTo,
      ["costPrice" + postfix]: sku.costPrice,
      ["otherExpenses" + postfix]: sku.otherExpenses,
    };

    var costPriceInputField = openCostPriceModal(data, isGuestAccess, postfix);
    var otherExpensesInputField = openOtherExpensesModal(data, isGuestAccess, postfix);

    var costPrice = createTdElement(costPriceInputField);
    var otherExpenses = createTdElement(otherExpensesInputField);
    var deliveryCost = createTdElement(sku.deliveryCost);
    var deductionOrPayment = createTdElement(sku.deductionOrPayment);
    var fines = createTdElement(sku.fines);
    var storageCost = createTdElement(sku.storageCost);
    var acceptance = createTdElement(sku.acceptance);
    var profit = createTdElement(sku.profit);

    var profitMarginTdId = "profitMargin" + postfix + "-" + skuIndex + "-" + reportPeriodYear;
    var profitMargin = createTdElement(sku.profitMargin, profitMarginTdId);

    var finalProfitTdId = "finalProfit" + postfix + "-" + skuIndex + "-" + reportPeriodYear;
    var finalProfit = createTdElement(sku.finalProfit, finalProfitTdId);

    tableRow.append(
      skuName,
      qty,
      returnAmount,
      deliveryCost,
      deductionOrPayment,
      fines,
      storageCost,
      acceptance,
      profit,
      costPrice,
      otherExpenses,
      profitMargin,
      finalProfit,
    );

    tableBody.append(tableRow);
    skuIndex++;
  }

  var table = document.createElement("table");
  table.id = "skus-table-" + reportPeriodYear;

  var { tableHead } = createSkusTableHead();

  table.append(tableHead, tableBody);

  var tablesContainer = document.getElementById("tables-container");
  tablesContainer.append(table);
};

export default createSKUsTable;

var tableHeadContent = `
   <tr>
          <th>Артикул</th>
          <th>Количество</th>
          <th>Возвраты</th>
          <th>Доставка</th>
          <th>Удержания/Выплаты</th>
          <th>Штрафы</th>
          <th>Хранение</th>
          <th>Приёмка</th>
          <th>Выплата с вычетом всех услуг WB</th>
          <th>Себестоимость</th>
          <th>Прочие расходы</th>
          <th>Маржинальность %</th>
          <th>Итого</th>
  </tr>`;

function createSkusTableHead() {
  var tableHead = document.createElement("thead");
  tableHead.innerHTML = tableHeadContent;
  return { tableHead };
}
