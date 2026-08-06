import createButton from "../modal/createButton.js";
import getConfirmMessage from "./getConfirmMessage.js";
import insertSkuRowToTable from "./insertSkuRowToTable.js";
import sendNewDisableStatus from "./sendNewDisableStatus.js";
import deleteSkuRowFromTable from "./deleteSkuRowFromTable.js";
import disableDisabledTableIfEmpty from "./disableDisabledTableIfEmpty.js";
import changeHiddenStatusOfSkusTable from "./changeSkuTableHiddenStatus.js";
import changeDisableStatusOfModalButton from "./changeDisableStatusOfModalButton.js";
import toggleSkuElementsVisibility from "../visibilityToggle/toggleSkuElementsVisibility.js";

/**
 * @param {'to-enable' | 'to-disable'} msg
 */

var createSkuRowVisibilityButtonHandler = (skuName, id) => {
  var btnId = skuName + "-disable";
  var msg = getConfirmMessage(skuName, "to-disable");

  var handler = {
    event: "click",
    cb: async () => {
      var confirmed = confirm(msg);

      if (confirmed) {
        var hasDisblAttribute = button.hasAttribute("disbl");
        var statusIsUpdated = await sendNewDisableStatus(skuName, id, hasDisblAttribute);

        if (statusIsUpdated) {
          var skuRow = document.getElementById(skuName);

          if (hasDisblAttribute) {
            button.removeAttribute("disbl");
            button.textContent = "скрыть";
            changeDisableStatusOfModalButton(skuName, "off");
            deleteSkuRowFromTable(skuRow, "disabled-skus-tbody");
            insertSkuRowToTable(skuRow, "enabled-skus-tbody");
            toggleSkuElementsVisibility(skuName, "unhide");
            msg = getConfirmMessage(skuName, "to-disable");
            disableDisabledTableIfEmpty();
            return;
          }

          button.setAttribute("disbl", "");
          button.textContent = "включить";
          changeDisableStatusOfModalButton(skuName, "on");
          deleteSkuRowFromTable(skuRow, "enabled-skus-tbody");
          insertSkuRowToTable(skuRow, "disabled-skus-tbody");
          msg = getConfirmMessage(skuName, "to-enable");
          changeHiddenStatusOfSkusTable("disabled-skus-table", "off");
          disableDisabledTableIfEmpty();
          toggleSkuElementsVisibility(skuName, "hide");
        }
      }

      return;
    },
  };

  var button = createButton("скрыть", "item", btnId, handler);

  return button;
};

export default createSkuRowVisibilityButtonHandler;
