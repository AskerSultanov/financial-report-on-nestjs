import createSkusTable from "./utils/createSkusTable.js";
import toggleSkuTableVisibillity from "./utils/visibilityToggle/toggleSkuTableVisibillity.js";
import toggleUploadListGoodsButtonVisibility from "./utils/visibilityToggle/toggleUploadListGoodsButtonVisibility.js";
import toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility from "./utils/visibilityToggle/toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility.js";
import toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility from "./utils/visibilityToggle/toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility.js";

var userId = document.cookie.split("=")[1];

var loadListGoodsButtonHandler = async () => {
  document.getElementById("upload-list-goods").addEventListener("click", async (e) => {
    e.preventDefault();

    var res = await fetch("/goods", {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: { "content-type": "application/json" },
    });

    if (!res.ok) {
      var { msg } = await res.json();
      alert(msg);
      return;
    }

    var { listGoods } = await res.json();

    toggleUploadListGoodsButtonVisibility("disable");
    toggleSkuTableVisibillity("enabled-skus-table", "enable");
    toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
    toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");
    await createSkusTable(listGoods, "enabled-skus-tbody");
  });
};

export default loadListGoodsButtonHandler;
