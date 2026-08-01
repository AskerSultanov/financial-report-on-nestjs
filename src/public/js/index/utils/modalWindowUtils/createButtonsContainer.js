var createButtonsContainer = (cancelButton, saveButton) => {
  var div = document.createElement("div");
  div.className = "modal-buttons";

  div.append(cancelButton, saveButton);
  return div;
};

export default createButtonsContainer;
