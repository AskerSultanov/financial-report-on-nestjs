var monthsList: string[] = [
  'декабрь',
  'ноябрь',
  'октябрь',
  'сентябрь',
  'август',
  'июль',
  'июнь',
  'май',
  'апрель',
  'март',
  'февраль',
  'январь',
];

export var getMonthNameAndIndex = (
  monthNum: number,
): { monthName: string; monthIndex: number } => {
  var monthName = monthsList[monthsList.length - monthNum];
  var monthIndex = monthsList.indexOf(monthName);
  return { monthName, monthIndex };
};
