var createSpanElement = (skuName) => {
  var span = document.createElement("span");
  span.id = "span-" + skuName;
  span.textContent = "Загрузить";
  span.style.display = "none";

  return span;
};

export default createSpanElement;
