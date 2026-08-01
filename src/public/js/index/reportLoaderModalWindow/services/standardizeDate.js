var startDayFromMS = new Date("2024-01-29").getTime();

var standardizeDate = (date) => {
  var [year, month, day] = date.split(".");

  var validDay = day.padStart(2, 0);
  var validMonth = month.padStart(2, 0);

  var validDateFormat = [year, validMonth, validDay].join("-");
  var validDateMS = new Date(validDateFormat).getTime();

  if (validDateMS < startDayFromMS) {
    return;
  }

  return validDateFormat;
};

export default standardizeDate;
