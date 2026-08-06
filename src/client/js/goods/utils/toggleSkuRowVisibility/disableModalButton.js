var disableModalButton = (skuName) => {
  var modalBtnId = skuName + "-modal";
  var modalBtn = document.getElementById(modalBtnId);
  modalBtn.disabled = true;
};

export default disableModalButton;
