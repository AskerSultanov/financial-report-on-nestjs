var createLinkToTheReport = (reportId) => {
  var button = document.createElement("button");
  var form = document.createElement("form");

  button.append("Открыть отчет");

  form.append(button);
  form.action = "/report/" + reportId;

  return form;
};

export default createLinkToTheReport;
