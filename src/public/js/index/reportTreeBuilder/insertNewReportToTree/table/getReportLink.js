import createLinkToTheReport from "./createLinkToTheReport.js";

var getReportLink = (reportId) => {
  var td = document.createElement("td");

  var linkToTheReport = createLinkToTheReport(reportId);

  td.append(linkToTheReport);

  return td;
};

export default getReportLink;
