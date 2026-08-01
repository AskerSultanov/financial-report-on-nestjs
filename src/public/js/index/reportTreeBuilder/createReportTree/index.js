import deleteEmptyMonth from "./deleteEmptyMonth.js";
import fillYearContainer from "./fillYearContainer.js";
import showNoReportsMessage from "./showNoReportsMessage.js";
import insertLastReportsToTree from "./insertLastReportsToTree.js";

var createReportTree = async (userId, lastReports, reportTree) => {
  if (!reportTree.length) {
    return showNoReportsMessage();
  }

  var lastMonthData = reportTree[0].months.shift();

  fillYearContainer(reportTree);
  insertLastReportsToTree(reportTree, lastReports, lastMonthData);

  deleteEmptyMonth(userId);
};

export default createReportTree;
