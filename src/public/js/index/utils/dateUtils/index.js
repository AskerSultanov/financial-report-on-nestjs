import getNextPeriod from "./services/getNextPeriod.js";
import hasPeriodOverlap from "./services/hasPeriodOverlap.js";
import { getMondaysOrSundaysOfMonth } from "./services/getMondaysOrSundaysOfMonth.js";

var getDateToByDateFrom = (dateFrom) => {
  var [year, month, day] = dateFrom.split("-").map(Number);

  var dateTo;

  if (hasPeriodOverlap(year, month, day)) {
    var { nextPeriod } = getNextPeriod(year, month);
    var { sundays } = getMondaysOrSundaysOfMonth(nextPeriod, "sunday");

    var firstSundayIndex = 0;

    dateTo = sundays[firstSundayIndex];

    var trancatedDate = dateTo.split("T")[0];
    return trancatedDate;
  }

  var { mondays } = getMondaysOrSundaysOfMonth(dateFrom, "monday");
  var dateFromISO = new Date(dateFrom).toISOString();
  var mondayIndex = mondays.indexOf(dateFromISO);

  var { sundays } = getMondaysOrSundaysOfMonth(dateFrom, "sunday");
  var sundayIndex = mondayIndex + 1;

  if (mondays.length > sundays.length) {
    sundayIndex--;
  }

  dateTo = sundays[sundayIndex];

  var trancatedDate = dateTo.split("T")[0];
  return trancatedDate;
};

export default getDateToByDateFrom;
