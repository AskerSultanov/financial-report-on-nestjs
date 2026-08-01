var sendPriceAndDiscount = async (skuId, skuDataToUpdate, checkedWeekDays, setNewPriceNow, expectedPriceExists = false) => {
  var userId = document.cookie.split("=")[1];
  var url = "/goods/prices-discounts/";

  var res = await fetch(url, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      skuId,
      userId,
      skuDataToUpdate,
      checkedWeekDays,
      setNewPriceNow,
      expectedPriceExists,
    }),
  });

  if (!res.ok) {
    alert("Не удалось сохранить...");
    return;
  }

  return true;
};

export default sendPriceAndDiscount;
