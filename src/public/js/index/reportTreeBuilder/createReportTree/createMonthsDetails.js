import createReportsTable from "./createReportsTable.js";
import createMonthlyReportDownloadButton from "./createMonthlyReportDownloadButton.js";

var userId = document.cookie.split("=")[1];

var getRequiredReports = async (reportIds) => {
  var url = "/api/required-reports/";

  var res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, reportIds: reportIds.map((item) => item.reportId) }),
  });

  var { reports } = await res.json();

  return { reports };
};

var createDetailsToReportsContainer = (year, month, reportIds) => {
  var summaryToMonthReportsContainer = document.createElement("summary");
  summaryToMonthReportsContainer.append(month);

  var monthReportsContainerId = `reports_container_${year}_${month}`;
  var monthReportsContainer = document.createElement("details");
  monthReportsContainer.id = monthReportsContainerId;

  monthReportsContainer.append(summaryToMonthReportsContainer);

  monthReportsContainer.addEventListener("click", async () => {
    if (!monthReportsContainer.open) {
      var reportTbodyId = `tbody_year_${year}_month_${month}`;

      if (!document.getElementById(reportTbodyId)) {
        var { reports } = await getRequiredReports(reportIds);

        var [reportsTable, downloadBtn] = await Promise.all([
          createReportsTable(year, month, reportIds, reports),
          createMonthlyReportDownloadButton(reportIds, year, month),
        ]);

        monthReportsContainer.append(reportsTable, downloadBtn);
        monthReportsContainer.open = true;
      }
    }
  });

  return monthReportsContainer;
};

var createMonthsDetails = (months, year) => {
  var monthsContainer = document.createElement("div");
  monthsContainer.class = "details";
  monthsContainer.id = `months_container_${year}`;

  for (var { month, reportIds } of months) {
    var reportsContainer = createDetailsToReportsContainer(year, month, reportIds);
    monthsContainer.append(reportsContainer);
  }

  return monthsContainer;
};

export default createMonthsDetails;
