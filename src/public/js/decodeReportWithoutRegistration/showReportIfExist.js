import showReport from "./showReport.js";

var showReportIfExist = () => {
  var userId = Object.keys(localStorage)[0];

  if (typeof userId === "string") {
    try {
      var reportAsJSON = localStorage.getItem(userId);

      if (reportAsJSON) {
        var report = JSON.parse(reportAsJSON);

        showReport(report);
      }
    } catch {
      return;
    }
  }

  return;
};

showReportIfExist();
