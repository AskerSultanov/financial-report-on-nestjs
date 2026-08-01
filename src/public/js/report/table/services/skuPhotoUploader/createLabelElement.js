var createLabelElement = (skuName) => {
  var label = document.createElement("label");
  label.htmlFor = "input-" + skuName;
  label.className = "sku-photo-uploader";

  return label;
};

export default createLabelElement;
