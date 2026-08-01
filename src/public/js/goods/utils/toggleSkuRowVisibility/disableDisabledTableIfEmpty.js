var disableDisabledTableIfEmpty = () => {
  var disabledSkuTbody = document.getElementById("disabled-skus-tbody");

  if (!disabledSkuTbody.hasChildNodes()) {
    var disabledSkuTable = document.getElementById("disabled-skus-table");
    disabledSkuTable.hidden = true;
  }
};

export default disableDisabledTableIfEmpty;
