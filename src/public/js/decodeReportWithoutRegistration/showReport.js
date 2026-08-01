import createSKUsTable from "./createSKUsTable.js";
import createTotalsTable from "./createTotalsTable.js";
import splitReportByYear from "../report/table/services/splitReportByYear.js";
import { enableDownloadReportAsXLSXButton } from "./downloadReportAsXLSXButton.js";
import getReportPeriodText from "../index/accountedFinancesPanel/getReportPeriodText.js";
import downloadReportAsXLSXButtonHandler from "../report/downloadReportAsXLSXButtonHandler.js";

var postfixStub = "";
var yearValueStub = "";
var isGuestAccess = true;
var reportSummaryLabelTextStub = "";
var startYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";
var downloadReportLink = "/decode-report-without-registration/xlsx/";
var newTextContentToDecodeReportWithoutRegistrationButton = "Получить новый отчёт";
var decodeReportWithoutRegistrationButton = document.getElementById("decode-report-without-registration-button");

var showReport = async (report) => {
  var { dateFrom, dateTo, isCrossYearPeriod } = report;

  var startYear = +report.dateFrom.split("-")[0];

  if (isCrossYearPeriod) {
    var endYear = +report.dateTo.split("-")[0];

    var fullPeriod = startYear + "-" + endYear;
    var fullReportPeriodText = getReportPeriodText(dateFrom, dateTo).reportPeriodText;

    createTotalsTable(report, yearValueStub, isCrossYearPeriod, fullReportPeriodText, postfixStub);

    var { startYearReportData, endYearReportData } = splitReportByYear(report, isGuestAccess);

    var startReportPeriodText = getReportPeriodText(dateFrom, dateTo, dateFrom).reportPeriodText;
    createTotalsTable(startYearReportData, startYear, isCrossYearPeriod, startReportPeriodText, startYearPostfix);
    createSKUsTable(startYearReportData, startYearPostfix, startYear);

    var endReportPeriodText = getReportPeriodText(dateFrom, dateTo, dateTo).reportPeriodText;
    createTotalsTable(endYearReportData, endYear, isCrossYearPeriod, endReportPeriodText, endYearPostfix);
    createSKUsTable(endYearReportData, endYearPostfix, endYear);
  } else {
    createTotalsTable(report, yearValueStub, isCrossYearPeriod, reportSummaryLabelTextStub, postfixStub);
    createSKUsTable(report, postfixStub, startYear);
  }

  enableDownloadReportAsXLSXButton();
  downloadReportAsXLSXButtonHandler(report, downloadReportLink, isGuestAccess);

  if (isCrossYearPeriod) {
    window.scrollTo({ top: 500, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 900, behavior: "smooth" });
  }

  decodeReportWithoutRegistrationButton.textContent = newTextContentToDecodeReportWithoutRegistrationButton;
};

export default showReport;
