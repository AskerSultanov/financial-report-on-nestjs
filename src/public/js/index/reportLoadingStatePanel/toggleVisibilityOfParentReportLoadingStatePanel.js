var parentReportLoadingStatePanel = document.getElementById("report-loading-state-panel");

var enableParentReportLoadingStatePanel = () => (parentReportLoadingStatePanel.hidden = false);
var disableParentReportLoadingStatePanel = () => {
  parentReportLoadingStatePanel.hidden = true;
  parentReportLoadingStatePanel.innerHTML = "";
};

export { enableParentReportLoadingStatePanel, disableParentReportLoadingStatePanel };
