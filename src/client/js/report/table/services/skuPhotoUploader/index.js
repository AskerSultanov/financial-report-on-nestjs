import createSpanElement from "./createSpanElement.js";
import createFormElement from "./createFormElement.js";
import createInputElement from "./createInputElement.js";
import createImageElement from "./createImageElement.js";
import createLabelElement from "./createLabelElement.js";
import createDeleteImgButton from "./createDeleteImgButton.js";

var createSKUPhotoUploader = (id, skuName, imgData) => {
  var input = createInputElement(skuName);
  var span = createSpanElement(skuName);
  var img = createImageElement(imgData, skuName);
  var deleteImgButton = createDeleteImgButton(skuName);

  if (imgData) {
    img.style.display = "block";
    span.style.display = "none";
  }

  img.style.display = "none";
  span.style.display = "block";

  var label = createLabelElement(skuName);
  label.append(input, img, span);

  var form = createFormElement(id, skuName);
  form.append(label);

  var container = document.createElement("div");
  container.className = "photo-cell-container";

  container.append(form, deleteImgButton);

  return container;
};

export default createSKUPhotoUploader;
