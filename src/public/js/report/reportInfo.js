import getReportPeriodText from "../index/accountedFinancesPanel/getReportPeriodText.js";

var reportInfo = (report) => {
  var { dateFrom, dateTo } = report;

  var reportPeriodElement = document.getElementById("report-period");

  reportPeriodElement.textContent = getReportPeriodText(dateFrom, dateTo).reportPeriodText;

  var reportsItemsCountElement = document.getElementById("report-items-count");
  reportsItemsCountElement.textContent = report.skus.length;

  var financialAccountingStatusElement = document.getElementById("financial-accounting-status");

  if (report.isFinancesAccounted) {
    financialAccountingStatusElement.textContent = "Да";
    financialAccountingStatusElement.setAttribute("is-finances-accounted", "");
  } else {
    financialAccountingStatusElement.textContent = "Нет";
  }
};

export default reportInfo;
