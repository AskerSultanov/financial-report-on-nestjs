var removeTokenButton = document.getElementById("remove-token-button");

var enableRemoveTokenButton = () => (removeTokenButton.hidden = false);
var disableRemoveTokenButton = () => (removeTokenButton.hidden = true);

export { enableRemoveTokenButton, disableRemoveTokenButton };
