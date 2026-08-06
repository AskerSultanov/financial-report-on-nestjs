import createLabel from "./services/createLabel.js";
import createSaveButton from "./services/createSaveButton.js";
import createModal from "../utils/modalWindowUtils/createModal.js";
import createTitle from "../utils/modalWindowUtils/createTitle.js";
import createInputField from "../utils/modalWindowUtils/createInputField.js";
import createCancelButton from "../utils/modalWindowUtils/createCancelButton.js";
import createButtonsContainer from "../utils/modalWindowUtils/createButtonsContainer.js";
import createUploadAllReportsCheckbox from "./services/createUploadAllReportsCheckbox.js";

var openReportPeriodModalWindow = (userId) => {
  var modal = createModal("modal-overlay");

  var dateFromInput = createInputField("dateFromInput", "начало в формате гггг.мм.дд - 2025.04.21");

  var dateToInput = createInputField("dateToInput", "конец в формате гггг.мм.дд - 2025.04.27");

  var uploadAllReportsCheckbox = createUploadAllReportsCheckbox();
  var label = createLabel("загрузить все отчеты", uploadAllReportsCheckbox);

  var saveButton = createSaveButton(userId, modal, dateFromInput, dateToInput, uploadAllReportsCheckbox);

  var cancelButton = createCancelButton(modal);

  var buttonsContainer = createButtonsContainer(cancelButton, saveButton);

  var title = createTitle("Введите период отчета");

  var modalContent = createModal("modal-content");
  modalContent.append(title, dateFromInput, dateToInput, label, buttonsContainer);

  modal.append(modalContent);

  document.body.append(modal);

  dateFromInput.focus();
};

export default openReportPeriodModalWindow;
