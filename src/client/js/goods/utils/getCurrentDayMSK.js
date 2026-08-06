var weekDays = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"];

var getCurrentDayMSK = () => {
  var formatter = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    weekday: "long",
  });

  var currentDayName = formatter.format(new Date());
  var currentDayIndex = weekDays.indexOf(currentDayName);

  return { currentDayName, currentDayIndex };
};

export default getCurrentDayMSK;
