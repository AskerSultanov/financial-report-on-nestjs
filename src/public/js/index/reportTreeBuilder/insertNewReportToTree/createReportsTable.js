import createReportsTableHead from "./table/createReportsTableHead.js";

var createReportsTable = (reportData, reportRow) => {
  var { year, month, reportId } = reportData;

  var tbodyId = `tbody_year_${year}_month_${month}`;
  var tbody = document.getElementById(tbodyId);

  if (!tbody) {
    tbody = document.createElement("tbody");

    tbody.id = tbodyId;
    tbody.append(reportRow);

    var tableHead = createReportsTableHead();

    var table = document.createElement("table");
    table.append(tableHead, tbody);

    return table;
  }

  var reportRowInNot = document.getElementById(reportId) === null;

  if (reportRowInNot) {
    tbody.append(reportRow);
  }

  return tbody;
};

export default createReportsTable;
