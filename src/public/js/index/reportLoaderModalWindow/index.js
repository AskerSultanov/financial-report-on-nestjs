import checkWBTokenExists from "../utils/checkWBTokenExists.js";
import openReportPeriodModalWindow from "./openReportPeriodModalWindow.js";

var reportLoaderModalWindowHandler = (userId) =>
  (document.getElementById("period-button").onclick = async (e) => {
    e.preventDefault();

    var result = await checkWBTokenExists(userId);

    if (!result.tokenIsExist) {
      if (result.error) {
        alert(result.errorMsg);
      } else {
        alert("В первую очередь нужно загрузить токен личного кабинета WB");
      }
    } else {
      openReportPeriodModalWindow(userId);
    }
  });

export default reportLoaderModalWindowHandler;
