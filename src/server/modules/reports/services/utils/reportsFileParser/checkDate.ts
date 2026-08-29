var dayStub: number = 15;
var mondayIndex: number = 1;
var sundayIndex: number = 0;
var reportRange: number = 6;
var firstMonthNum: number = 1;
var lastMonthNum: number = 12;
var pseudoSundayIndex: number = 7;

var checkAndFixMonday = (dateFrom: string): { dateFrom: string } => {
  var [year, month, day] = dateFrom.split('-').map(Number);

  var date: Date = new Date(year, month - 1, day);
  var dayIndex: number = date.getDay();
  var isMonday: boolean = dayIndex === mondayIndex;

  if (isMonday) {
    return { dateFrom };
  }

  var isReportStartInPreviousMonth: boolean = +day - reportRange < 1;

  if (isReportStartInPreviousMonth) {
    var isFirstMonth: boolean = firstMonthNum === +month;

    if (isFirstMonth) {
      var prevYear: number = +year - 1;
      var lastMonthDate: Date = new Date(prevYear, lastMonthNum, dayStub);
      var daysPerLastMonth: number = new Date(
        lastMonthDate.getFullYear(),
        lastMonthDate.getMonth() + 1,
        0,
      ).getDate();
      var mondayDay: number = daysPerLastMonth + +day - reportRange;

      dateFrom = `${prevYear}-${lastMonthNum}-${String(mondayDay).padStart(2, '0')}`;
    } else {
      var prevMonthNum: number = +month - 1;
      var prevMonthDate: Date = new Date(year, prevMonthNum - 1, day);
      var daysPerPrevMonth: number = new Date(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth() + 1,
        0,
      ).getDate();

      var isSunday: boolean = dayIndex === sundayIndex;

      if (isSunday) {
        var restIndexesInCurrentMonth: number = +day - pseudoSundayIndex + 1;
      } else {
        var restIndexesInCurrentMonth: number = +day - dayIndex + 1;
      }

      var mondayDay: number = daysPerPrevMonth + restIndexesInCurrentMonth;
      dateFrom = `${year}-${String(prevMonthNum).padStart(2, '0')}-${String(mondayDay).padStart(2, '0')}`;
    }
  } else {
    var mondayDay: number;
    var dayAsNum: number = +day;
    var isSunday: boolean = dayIndex === sundayIndex;

    if (isSunday) {
      mondayDay = dayAsNum - reportRange;
    } else {
      var dayIndexDiff: number = dayIndex - mondayIndex;
      mondayDay = dayAsNum - dayIndexDiff;
    }

    dateFrom = `${year}-${month}-${String(mondayDay).padStart(2, '0')}`;
  }

  return { dateFrom };
};

var checkAndFixSunday = (dateTo: string): { dateTo: string } => {
  var [year, month, day] = dateTo.split('-').map(Number);
  var date: Date = new Date(year, month - 1, day);
  var dayIndex: number = date.getDay();

  var isSunday: boolean = dayIndex === sundayIndex;

  if (isSunday) {
    return { dateTo };
  }

  var daysPerMonth: number = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();

  var daysSum: number = +day + reportRange;
  var restDays: number = daysPerMonth - +day;
  var isReportEndInNextMonth: boolean = daysSum > daysPerMonth;

  var daysToSunday: number = pseudoSundayIndex - dayIndex;
  var daysToSundayInCurrentMonth: number = -(restDays - daysToSunday);

  if (isReportEndInNextMonth) {
    var isLastMonth: boolean = lastMonthNum === +month;

    if (isLastMonth) {
      var nextYear: number = +year + 1;
      dateTo = `${nextYear}-${String(firstMonthNum).padStart(2, '0')}-${String(daysToSundayInCurrentMonth).padStart(2, '0')}`;
    } else {
      var nextMonthNum: number = +month + 1;
      dateTo = `${year}-${String(nextMonthNum).padStart(2, '0')}-${String(daysToSundayInCurrentMonth).padStart(2, '0')}`;
    }
  } else {
    var sundayDay: number = +day + daysToSunday;
    dateTo = `${year}-${month}-${String(sundayDay).padStart(2, '0')}`;
  }

  return { dateTo };
};

export { checkAndFixMonday, checkAndFixSunday };
