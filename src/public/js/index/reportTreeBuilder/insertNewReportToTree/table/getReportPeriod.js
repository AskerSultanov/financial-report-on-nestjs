var getReportPeriod = (dateFrom, dateTo) => {
  var td = document.createElement("td");

  var dateFromDiv = document.createElement("div");
  var dateToDiv = document.createElement("div");

  dateFromDiv.append("с ", dateFrom.split("-").join("."));
  dateToDiv.append("по ", dateTo.split("-").join("."));

  var br = document.createElement("br");

  td.append(dateFromDiv, br, dateToDiv);

  return td;
};

export default getReportPeriod;
