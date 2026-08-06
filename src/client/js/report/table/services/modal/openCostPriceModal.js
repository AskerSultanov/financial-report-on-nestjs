import costPriceModal from "./costPriceModal.js";
import createButton from "./utils/createButton.js";

var openCostPriceModal = (skuData, isGuestAccess, postfix) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var costPriceDisplayElement = document.createElement("span");
  costPriceDisplayElement.className = "editable-field-value";
  costPriceDisplayElement.textContent = skuData["costPrice" + postfix];
  costPriceDisplayElement.id = `costPrice${postfix}-${skuData.skuIndex}-${skuData.year}`;

  var event = "click";
  var cb = () => costPriceModal(skuData, costPriceDisplayElement, isGuestAccess, postfix);
  var buttonTextContent = "Изменить";
  var openCostPriceModalButton = createButton("editable-field-button", buttonTextContent, { event, cb });

  container.append(costPriceDisplayElement, openCostPriceModalButton);
  return container;
};

export default openCostPriceModal;
