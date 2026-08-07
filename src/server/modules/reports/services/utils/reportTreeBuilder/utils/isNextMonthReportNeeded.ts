export var isNextMonthReportNeeded = (
  dateFrom: string,
  dateTo: string,
): boolean => {
  var [startYear, startMonth, startDay] = dateFrom.split('-').map(Number);
  var [_, endMonth, endDay] = dateTo.split('-').map(Number);

  if (startMonth === endMonth) {
    return false;
  }

  var daysInCurrentMonth = new Date(startYear, startMonth, 0).getDate();

  var isCarryoverRequired = daysInCurrentMonth - startDay + 1 < +endDay;
  return isCarryoverRequired;
};
