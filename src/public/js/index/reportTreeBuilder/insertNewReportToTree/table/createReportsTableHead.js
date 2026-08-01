import createThElement from "../../../../report/table/services/createThElement.js";

var createReportsTableHead = () => {
  var reportPeriod = createThElement("Период отчета");

  var totalFinalProfit = createThElement("Чистая прибыль");

  var totalProductCosts = createThElement("Затраты на товар");

  var totalTaxAmount = createThElement("Налоги");

  var financesAccounted = createThElement("Финансы учтены");

  var reportLink = createThElement("");

  var tr = document.createElement("tr");

  tr.append(reportPeriod, totalFinalProfit, totalProductCosts, totalTaxAmount, financesAccounted, reportLink);

  var thead = document.createElement("thead");
  thead.append(tr);

  return thead;
};

export default createReportsTableHead;
