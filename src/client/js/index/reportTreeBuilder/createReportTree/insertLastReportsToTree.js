import createReportsTable from "./createReportsTable.js";
import createMonthlyReportDownloadButton from "./createMonthlyReportDownloadButton.js";

var insertLastReportsToTree = (tree, lastReports, lastMonthData) => {
  var { year } = tree[0];
  var { month, reportIds } = lastMonthData;

  var table = createReportsTable(year, month, reportIds, lastReports);

  var summary = document.createElement("summary");
  summary.append(month);

  var monthReportsContainerId = `reports_container_${year}_${month}`;
  var monthReportsContainer = document.createElement("details");
  monthReportsContainer.id = monthReportsContainerId;

  var lastReportIds = lastReports.map(({ reportId }) => reportId);
  var downloadBtn = createMonthlyReportDownloadButton(lastReportIds, year, month);

  monthReportsContainer.append(summary, table, downloadBtn);
  monthReportsContainer.open = true;

  var monthsContainerId = `months_container_${year}`;
  var monthsContainer = document.getElementById(monthsContainerId);
  monthsContainer.prepend(monthReportsContainer);

  var lastYearDetailsId = year;
  var lastYearDetails = document.getElementById(lastYearDetailsId);
  lastYearDetails.open = true;
};

export default insertLastReportsToTree;
