import createMonthsDetails from "./createMonthsDetails.js";

var fillYearContainer = (years) => {
  var yearsContainer = document.getElementById("years_container");

  for (var { year, months } of years) {
    var summary = document.createElement("summary");
    summary.append(year);

    var monthsDetails = createMonthsDetails(months, year);

    var yearDetails = document.createElement("details");
    yearDetails.id = year;

    yearDetails.append(summary, monthsDetails);

    yearsContainer.append(yearDetails);
  }
};

export default fillYearContainer;
