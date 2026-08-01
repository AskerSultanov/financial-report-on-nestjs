import createDiv from "./createDiv.js";
import createLabel from "./createLabel.js";
import createInput from "./createInput.js";
import getSelectedWeekDayIdFromSelector from "./getSelectedWeekDayIdFromSelector.js";

var weekDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

var createWeekDaysPicker = () => {
  var fieldset = document.createElement("fieldset");
  var allDaysId = 7;

  var input = createInput(allDaysId, "checkbox", "На всю неделю", "checkbox");
  input.checked = true;

  var label = createLabel(input, "На всю неделю", "wrapinput - yes");

  var div = createDiv();
  div.append(input, label);

  var legeng = document.createElement("legend");
  legeng.append("Установить цену на");

  fieldset.append(legeng, div);

  var { selectedWeekDayId } = getSelectedWeekDayIdFromSelector();
  if (selectedWeekDayId !== 7) {
    input.checked = false;
  }

  var inputId = 0;
  for (var dayName of weekDays) {
    input = createInput(inputId, "checkbox", dayName, "checkbox");

    if (inputId === selectedWeekDayId) {
      input.checked = true;
    }

    label = createLabel(input, dayName, "wrapinput - yes");
    div = createDiv();
    div.append(input, label);

    fieldset.append(div);

    inputId++;
  }

  return fieldset;
};

export default createWeekDaysPicker;
