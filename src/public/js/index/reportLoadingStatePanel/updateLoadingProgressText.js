var queueCapacityBeforeZeroed = 0;
var stoppedLoadingText = "остановлена";
var getLoadingProgressText = (loadingInProgress) => (loadingInProgress ? "активна" : "закончена");
var delay = async () => new Promise((res) => setTimeout(res, 3000));

var updateLoadingProgressText = async (loadingState) => {
  var progressInfoText;

  var loadingStateProgressInfoElement = document.getElementById("loading-state-progress-info");
  var loadingStateProgressStatusElement = document.getElementById("loading-state-progress-status");

  var { queueCapacity, queueLength, loadingInProgress, abandonedReports, isReportLoadingIsStopped, loadingStopReason } = loadingState;

  var numberOfSavedReports = queueCapacity - queueLength - abandonedReports.length;

  var progressStatusText = getLoadingProgressText(loadingInProgress);

  if (isReportLoadingIsStopped) {
    var loadingStopReasonElement = document.getElementById("loading-stop-reason");

    if (!loadingStopReasonElement) {
      loadingStopReasonElement = document.createElement("div");
      loadingStopReasonElement.id = "loading-stop-reason";
    }

    loadingStopReasonElement.textContent = "Причина: " + getReasonText(loadingStopReason);

    loadingStateProgressStatusElement.textContent = "Загрузка: " + stoppedLoadingText + "\n";
    loadingStateProgressStatusElement.insertAdjacentElement("afterend", loadingStopReasonElement);
  } else {
    loadingStateProgressStatusElement.textContent = "Загрузка: " + progressStatusText;
  }

  if (queueLength === 0) {
    numberOfSavedReports = queueCapacity - queueLength - abandonedReports.length;

    if (numberOfSavedReports === 0) {
      progressInfoText = `Загружено: ${queueCapacityBeforeZeroed} / ${queueCapacityBeforeZeroed}`;
      loadingStateProgressInfoElement.textContent = progressInfoText;

      await delay();
    } else {
      numberOfSavedReports = queueCapacityBeforeZeroed - queueLength - abandonedReports.length;

      progressInfoText = `Загружено: ${numberOfSavedReports} / ${queueCapacityBeforeZeroed}`;
      loadingStateProgressInfoElement.textContent = progressInfoText;
    }

    queueCapacityBeforeZeroed = 0;
  } else if (queueLength === 1) {
    queueCapacityBeforeZeroed = queueCapacity;

    progressInfoText = `Загружено: ${numberOfSavedReports} / ${queueCapacity}`;
    loadingStateProgressInfoElement.textContent = progressInfoText;
  } else {
    progressInfoText = `Загружено: ${numberOfSavedReports} / ${queueCapacity}`;
    loadingStateProgressInfoElement.textContent = progressInfoText;
  }
};

export default updateLoadingProgressText;

var getReasonText = function (reason) {
  var reasonText = "";

  switch (reason) {
    case "isTokenMissing":
      reasonText = "отсутствие токена";
      break;
    case "tokenIsExpired":
      reasonText = "токен просрочен";
      break;
  }

  return reasonText;
};
