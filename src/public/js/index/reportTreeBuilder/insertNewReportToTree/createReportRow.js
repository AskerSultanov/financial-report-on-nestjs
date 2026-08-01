import getReportLink from "./table/getReportLink.js";
import getReportPeriod from "./table/getReportPeriod.js";
import createTdElement from "../../../report/table/services/createTdElement.js";

var elemIdStub = null;

var createReportRow = (reportData) => {
  var { dateFrom, dateTo, reportId, totalTaxAmount } = reportData;

  var reportPeriod = getReportPeriod(dateFrom, dateTo);

  var reportLink = getReportLink(reportId);

  var totalProductCostsTdClassName = "totalProductCosts";
  var totalProductCostsTd = createTdElement(0, elemIdStub, totalProductCostsTdClassName);

  var totalTaxAmountTdClassName = "totalTaxAmount";
  var totalTaxAmountTd = createTdElement(totalTaxAmount, elemIdStub, totalTaxAmountTdClassName);

  var totalFinalProfitTdClassName = "totalFinalProfit";
  var totalFinalProfitTd = createTdElement(0, elemIdStub, totalFinalProfitTdClassName);

  var financesAccountedTd = createTdElement();

  financesAccountedTd.textContent = "";
  financesAccountedTd.innerHTML = '<span style="color: red;">&#10008;</span>';

  var tr = document.createElement("tr");
  tr.id = reportId;

  tr.append(reportPeriod, totalFinalProfitTd, totalProductCostsTd, totalTaxAmountTd, financesAccountedTd, reportLink);

  return tr;
};

export default createReportRow;
