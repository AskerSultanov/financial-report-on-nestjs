var showNoReportsMessage = () => {
  var yearsContainer = document.getElementById("years_container");

  var noReportsMessageDiv = document.createElement("div");
  noReportsMessageDiv.textContent = "Отчетов пока нет";
  noReportsMessageDiv.id = "no_reports_message";
  noReportsMessageDiv.style.fontSize = "24px";

  yearsContainer.append(noReportsMessageDiv);
};

export default showNoReportsMessage;
