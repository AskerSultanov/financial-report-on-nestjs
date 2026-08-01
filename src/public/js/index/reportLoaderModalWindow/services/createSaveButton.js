import checkDateTo from "./checkDateTo.js";
import checkDateFrom from "./checkDateFrom.js";
import sendReportPeriod from "./sendReportPeriod.js";
import { showSpinner, hideSpinner } from "./loaderSpinner.js";
import { insertNewReportToTree } from "../../reportTreeBuilder/index.js";
import reportLoadingStatePanelBuilder from "../../reportLoadingStatePanel/index.js";

var isMainPageLoad = false;
var reportLoadState = null;
var reportComingSoonMsg = "Отчет скоро будет добавлен.";

var createSaveButton = (userId, modal, dateFromInputElem, dateToInputElem, uploadAllReportsCheckbox) => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-save";
  button.textContent = "Отправить";

  button.onclick = async () => {
    document.body.removeChild(modal);

    var needToLoadAllReports = uploadAllReportsCheckbox.checked;

    try {
      if (needToLoadAllReports) {
        var dateFrom = "";
        var dateTo = "";
        var isPeriodWithinSameWeek = false;
        await sendReportPeriod(userId, validDateFrom, validDateTo, isPeriodWithinSameWeek, needToLoadAllReports);

        setTimeout(() => reportLoadingStatePanelBuilder(userId, reportLoadState, isMainPageLoad), 3000);
      } else {
        var dateFrom = dateFromInputElem.value;
        var dateTo = dateToInputElem?.value;

        var { validDateFrom } = checkDateFrom(dateFrom);
        var { validDateTo, isPeriodWithinSameWeek } = checkDateTo(dateTo, validDateFrom);

        if (isPeriodWithinSameWeek) {
          showSpinner();

          var { reportData, msg } = await sendReportPeriod(userId, validDateFrom, validDateTo, isPeriodWithinSameWeek);

          await hideSpinner();

          if (msg) {
            alert(msg);

            if (msg === reportComingSoonMsg) {
              setTimeout(() => reportLoadingStatePanelBuilder(userId, reportLoadState, isMainPageLoad), 3000);
            }
          } else {
            if (!reportData) {
              return;
            }

            insertNewReportToTree(reportData);
            console.log("loader removed");

            var confirmed = confirm("Отчет успешно сохранен.\nПерейти к отчету?");

            if (confirmed) {
              window.location.href = "/report/" + reportData.reportId;
            }
          }
        } else {
          await sendReportPeriod(userId, validDateFrom, validDateTo, isPeriodWithinSameWeek);

          setTimeout(() => reportLoadingStatePanelBuilder(userId, reportLoadState, isMainPageLoad), 3000);
        }
      }
    } catch (e) {
      await hideSpinner();
      console.log(e);
      alert("Произошла ошибка...");
    }
  };

  return button;
};

export default createSaveButton;
