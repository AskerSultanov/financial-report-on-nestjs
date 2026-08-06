var getSelectedWeekDayIdFromSelector = () => {
  var weekDaySelector = document.getElementById("week-days-select");
  var allDaysId = 7;

  if (!weekDaySelector) {
    return { selectedWeekDayId: allDaysId };
  }

  var selectedWeekDayId;

  weekDaySelector.childNodes.forEach((item) => {
    if (item?.selected) {
      selectedWeekDayId = +item.value;
    }
  });

  return { selectedWeekDayId };
};

export default getSelectedWeekDayIdFromSelector;
