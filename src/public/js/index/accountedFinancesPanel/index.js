import showLastAccountedFinancesPanel from "./showLastAccountedFinancesPanel.js";
import insertLastAccountedFinancesReportDataToPanel from "./insertLastAccountedFinancesReportDataToPanel.js";
import otherAccountedFinancesReportsModalWindowHandler from "./otherAccountedFinancesReportsModalWindowHandler.js";

var lastAccountedFinancesPanel = document.getElementById("last-accounted-finances-report");

var accountedFinancesPanelHandler = (accountedFinances) => {
  if (accountedFinances.length) {
    showLastAccountedFinancesPanel();
    var lastAccountedFinancesReport = accountedFinances.shift();
    insertLastAccountedFinancesReportDataToPanel(lastAccountedFinancesReport);
    otherAccountedFinancesReportsModalWindowHandler(accountedFinances)
  }
};

export default accountedFinancesPanelHandler;
