import isFutureDate from "./isFutureDate.js";
import standardizeDate from "./standardizeDate.js";
import getDateToByDateFrom from "../../utils/dateUtils/index.js";

var checkDateTo = (dateTo, dateFrom) => {
  var expectedDateTo = getDateToByDateFrom(dateFrom);

  if (!dateTo) {
    if (isFutureDate(expectedDateTo)) {
      throw new Error("Отчет еще не готов...");
    }

    return { validDateTo: expectedDateTo, isPeriodWithinSameWeek: true };
  }

  var dateIncludesDot = dateTo.split("").includes(".");

  if (!dateIncludesDot) {
    throw new Error("Неккоректный период");
  }

  var everyIsNum = dateTo
    .split(".")
    .map(Number)
    .every((num) => typeof num === "number" && !isNaN(num));

  if (!everyIsNum) {
    throw new Error("Неккоректный период");
  }

  dateTo = standardizeDate(dateTo);

  if (isFutureDate(dateTo)) {
    throw new Error("Отчет еще не готов...");
  }

  if (!dateTo) {
    throw new Error("Конец периода введен некорректно");
  }

  if (dateTo === expectedDateTo) {
    return { validDateTo: expectedDateTo, isPeriodWithinSameWeek: true };
  }

  return { validDateTo: dateTo, isPeriodWithinSameWeek: false };
};

export default checkDateTo;
