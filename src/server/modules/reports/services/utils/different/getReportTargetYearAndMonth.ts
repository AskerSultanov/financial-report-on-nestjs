var reportRange: number = 6;

var belongsToCurrentMonth = (
  year: number,
  month: number,
  day: number,
): boolean => {
  var daysInMonth: number = new Date(year, month, day).getDate();
  return daysInMonth - day >= reportRange;
};

export var getReportTargetYearAndMonth = (
  dateFrom: string,
  dateTo: string,
): { targetYear: number; targetMonthIndex: number } => {
  var [startYear, startMonth, startDays]: number[] = dateFrom
    .split('-')
    .map(Number);
  var [endYear, endMonth, _]: number[] = dateTo.split('-').map(Number);

  var targetYear: number;
  var targetMonthIndex: number;

  if (startMonth !== endMonth) {
    if (belongsToCurrentMonth(startYear, startMonth, startDays)) {
      targetYear = startYear;
      targetMonthIndex = startMonth - 1;
    } else {
      targetYear = endYear;
      targetMonthIndex = endMonth - 1;
    }
  } else {
    targetYear = startYear;
    targetMonthIndex = startMonth - 1;
  }

  return { targetYear, targetMonthIndex };
};
