var newTextContent = "Обновить";
var saveButton = document.getElementById("token-button");

var renameSaveButton = () => (saveButton.innerText = newTextContent);

export default renameSaveButton;
