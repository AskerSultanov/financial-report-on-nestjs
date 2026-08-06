var setWeekDaySelectorToCurrentDay = (currentDayName) => {
  var options = document.querySelectorAll("option");
  for (var option of options) {
    if (option.text === currentDayName) {
      option.selected = true;
      break;
    }
  }
};

export default setWeekDaySelectorToCurrentDay;
