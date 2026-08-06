var createImageElement = (base64, skuName) => {
  var img = document.createElement("img");
  img.id = "img-" + skuName;
  img.src = `data:image/png=;base64,${base64}`;
  img.alt = "Добавить";
  img.className = "cell-photo";

  return img;
};

export default createImageElement;
