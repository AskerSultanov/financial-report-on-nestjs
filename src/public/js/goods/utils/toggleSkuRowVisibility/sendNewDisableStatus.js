var sendNewDisableStatus = async (skuName, nmID, disableStatus) => {
  var url = "/goods/sku-disable-status";
  var userId = document.cookie.split("=")[1];

  disableStatus = disableStatus === false;

  var res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ userId, skuName, nmID, disableStatus }),
    headers: { "content-type": "application/json" },
  });

  if (!res.ok) {
    alert("Не удалось скрыть товар...");
    return;
  }

  return true;
};

export default sendNewDisableStatus;
