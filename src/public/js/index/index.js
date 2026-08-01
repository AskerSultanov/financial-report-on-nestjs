import logoutButtonHandler from "./logout/index.js";
import getMainPageData from "./utils/getMainPageData.js";
import { createReportTree } from "./reportTreeBuilder/index.js";
import accountedFinancesPanelHandler from "./accountedFinancesPanel/index.js";
import reportLoaderModalWindowHandler from "./reportLoaderModalWindow/index.js";
import reportLoadingStatePanelBuilder from "./reportLoadingStatePanel/index.js";
import reportFileUploadModalWindow from "./reportFileUploadModalWindow/index.js";

var isMainPageLoad = true;
var userId = document.cookie.split("=")[1];

var main = async () => {
  var { lastReports, reportTree, reportLoadingState, reportsWithAccountedFinances } = await getMainPageData(userId);

  createReportTree(userId, lastReports, reportTree);

  reportLoaderModalWindowHandler(userId);

  reportLoadingStatePanelBuilder(userId, reportLoadingState, isMainPageLoad);
  accountedFinancesPanelHandler(reportsWithAccountedFinances);
  logoutButtonHandler(userId);

  reportFileUploadModalWindow(userId);
};

main();
