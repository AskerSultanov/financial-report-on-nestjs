import createButton from "./utils/createButton.js";
import otherExpensesModal from "./otherExpensesModal.js";

var openOtherExpensesModal = (skuData, isGuestAccess, postfix) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var otherExpensesTdElement = document.createElement("span");
  otherExpensesTdElement.className = "editable-field-value";
  otherExpensesTdElement.textContent = skuData["otherExpenses" + postfix];
  otherExpensesTdElement.id = `otherExpenses${postfix}-${skuData.skuIndex}-${skuData.year}`;

  var event = "click";
  var cb = () => otherExpensesModal(skuData, otherExpensesTdElement, isGuestAccess, postfix);
  var buttonTextContent = "Изменить";
  var openOtherExpensesModalButton = createButton("editable-field-button", buttonTextContent, { event, cb });

  container.append(otherExpensesTdElement, openOtherExpensesModalButton);
  return container;
};

export default openOtherExpensesModal;
