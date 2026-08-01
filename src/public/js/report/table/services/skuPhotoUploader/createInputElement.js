import sendSkuPhoto from "./sendSkuPhoto.js";
import insertImageToImgTag from "./insertImageToImgTag.js";

var createInputElement =  (skuName) => {
  var input = document.createElement("input");
  input.id = "input-" + skuName;
  input.name = "sku-photo";
  input.type = "file";
  input.multiple = false;
  input.accept = "image/jpg, image/jpeg, image/png";
  input.style.display = "none";

  input.addEventListener("change", async (e) => {
    e.preventDefault();

    var uploadFormData = new FormData();

    uploadFormData.append("skuName", skuName);
    uploadFormData.append("sku-photo", input.files[0]);

    var success = await sendSkuPhoto(uploadFormData);

    if (!success) {
      alert("Не удалось загрузить изображение");
      return;
    }

    alert("Изображение сохранено");
    await insertImageToImgTag(e, skuName);
  });

  return input;
};

export default createInputElement;
