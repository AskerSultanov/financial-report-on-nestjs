/**
 * @param {'on' | 'off'} disableStatus
 */

var changeDisableStatusOfModalButton = (skuName, disableStatus) => {
  var modalBtnId = skuName + "-modal";
  var modalBtn = document.getElementById(modalBtnId);
  if (disableStatus === "on") {
    modalBtn.disabled = true;
    return;
  }

  modalBtn.disabled = false;
};

export default changeDisableStatusOfModalButton;
