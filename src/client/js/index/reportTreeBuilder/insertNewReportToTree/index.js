import createReportRow from "./createReportRow.js";
import createYearDetails from "./createYearDetails.js";
import createReportsTable from "./createReportsTable.js";
import removeNoReportsMessage from "./removeNoReportsMessage.js";

var insertNewReportToTree = (reportData) => {
  removeNoReportsMessage();

  var { year, month, reportId } = reportData;

  var yearDetailsId = year;

  var yearDetails = document.getElementById(yearDetailsId);

  if (!yearDetails) {
    var yearDetails = createYearDetails(reportData);

    var yearsContainer = document.getElementById("years_container");
    yearsContainer.prepend(yearDetails);

    return;
  }

  yearDetails.open = true;

  var reportTbodyId = `tbody_year_${year}_month_${month}`;
  var monthReportsContainerId = `reports_container_${year}_${month}`;

  var monthReportsContainer = document.getElementById(monthReportsContainerId);

  if (!monthReportsContainer) {
    var summaryToMonthReportsContainer = document.createElement("summary");
    summaryToMonthReportsContainer.append(month);

    monthReportsContainer = document.createElement("details");
    monthReportsContainer.id = monthReportsContainerId;

    var monthsContainerId = `months_container_${year}`;
    var monthsContainer = document.getElementById(monthsContainerId);
    monthsContainer.append(monthReportsContainer);

    var reportRow = createReportRow(reportData);
    var reportsTable = createReportsTable(reportData, reportRow);
    monthReportsContainer.append(summaryToMonthReportsContainer, reportsTable);

    monthReportsContainer.open = true;
  } else {
    monthReportsContainer.addEventListener("click", async () => {
      var reportRow = createReportRow(reportData);

      await delayForCreatingTableBody();

      var reportTbody = document.getElementById(reportTbodyId);

      var reportRowInNot = document.getElementById(reportId) === null;

      if (reportRowInNot) {
        reportTbody.append(reportRow);
      }
    });

    monthReportsContainer.click();
    monthReportsContainer.open = true;
  }
};

export default insertNewReportToTree;

async function delayForCreatingTableBody() {
  return new Promise((res) => setTimeout(res, 20));
}
