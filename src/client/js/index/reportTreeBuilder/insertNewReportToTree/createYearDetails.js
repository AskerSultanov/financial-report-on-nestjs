import createMonthDetails from "./createMonthDetails.js";

var createYearDetails = (reportData) => {
  var { year } = reportData;

  var summary = document.createElement("summary");
  summary.append(year);

  var monthDetails = createMonthDetails(reportData);

  var monthsContainerId = `months_container_${year}`;
  var monthsContainer = document.getElementById(monthsContainerId);

  if (!monthsContainer) {
    monthsContainer = document.createElement("div");
    monthsContainer.id = monthsContainerId;
  }

  monthsContainer.append(monthDetails);
  monthDetails.open = true;

  var yearDetails = document.createElement("details");
  yearDetails.id = year;
  yearDetails.open = true;
  yearDetails.append(summary, monthsContainer);

  return yearDetails;
};

export default createYearDetails;
