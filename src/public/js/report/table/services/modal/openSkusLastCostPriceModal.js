import createButton from "./utils/createButton.js";
import skusLastCostPriceModal from "./skusLastCostPriceModal.js";

var openSkusLastCostPriceModal = (skusLastCostPrice) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var costPriceTdElement = document.createElement("span");
  costPriceTdElement.className = "editable-field-value";
  costPriceTdElement.textContent = skuData.costPrice;
  costPriceTdElement.id = `costprice-${skuData.skuIndex}`;

  var event = "click";
  var cb = () => skusLastCostPriceModal(skusLastCostPrice);
  var buttonTextContent = "Изменить";
  var openCostPriceModalButton = createButton("editable-field-button", buttonTextContent, { event, cb });

  container.append(costPriceTdElement, openCostPriceModalButton);
  return container;
};

export default openSkusLastCostPriceModal;
