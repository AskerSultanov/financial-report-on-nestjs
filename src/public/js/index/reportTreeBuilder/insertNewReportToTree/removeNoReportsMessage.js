var removeNoReportsMessage = () => {
  var noReportsMessageDiv = document.getElementById("no_reports_message");

  if (!noReportsMessageDiv) {
    return;
  }

  noReportsMessageDiv.remove();
};

export default removeNoReportsMessage;
