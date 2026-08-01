var createCancelButton = (modal) => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-cancel";
  button.textContent = "Закрыть";

  button.onclick = () => document.body.removeChild(modal);

  return button;
};

export default createCancelButton;
