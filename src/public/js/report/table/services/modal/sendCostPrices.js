var sendCostPrices = async (userId, reportId, taxYear, costPrices) => {
  var url = "/report/skus/cost-prices";

  var res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, reportId, taxYear, costPrices }),
  });

  if (!res.ok) {
    alert("Не удалось установить себестоимости...");
    return;
  }

  var { skusDataToClient, totals, years } = await res.json();

  return { skusDataToClient, totals, years };
};

export default sendCostPrices;
