import createSaveButton from "./createSaveButton.js";
import createTitle from "../index/utils/modalWindowUtils/createTitle.js";
import createModal from "../index/utils/modalWindowUtils/createModal.js";
import createInputField from "../index/utils/modalWindowUtils/createInputField.js";
import createCancelButton from "../index/utils/modalWindowUtils/createCancelButton.js";
import createButtonsContainer from "../index/utils/modalWindowUtils/createButtonsContainer.js";

var openTokenLoaderModal = (userId) => {
  var input = createInputField("token");
  input.type = "text";

  var modal = createModal("modal-overlay");
  modal.id = "token-modal";

  var saveButton = createSaveButton(userId, input, modal);

  var cancelButton = createCancelButton(modal);

  var buttonsContainer = createButtonsContainer(cancelButton, saveButton);

  buttonsContainer.append(cancelButton, saveButton);

  var modalContent = createModal("modal-content");

  var title = createTitle("Введите токен");

  modalContent.append(title, input, buttonsContainer);
  modal.append(modalContent);

  document.body.append(modal);

  input.focus();
};

export default openTokenLoaderModal;
