/**
 * @param {'sunday' | 'monday'} weekDayName
 */

export var getMondaysOrSundaysOfMonth = (
  date: string,
  weekDayName: string,
): { weekDays: string[] } => {
  var weekDays = [];

  var weekDayNum = weekDayName === 'sunday' ? 0 : 1;

  var [year, month] = date.split('-').map(Number);

  var dateObject = new Date(year, month, 0);
  var daysPerMonth = dateObject.getDate();

  for (var i = 0; i <= daysPerMonth; i++) {
    var nextDay = new Date(`${year}-${month}-${String(i).padStart(2, '0')}`);

    if (nextDay.getDay() === weekDayNum) {
      weekDays.push(nextDay.toISOString());
    }
  }

  return { weekDays };
};
