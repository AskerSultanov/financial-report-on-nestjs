var updateCostPricesIntoSkusTable = (newCostPrices, years) => {
  if (!years.length) {
    for (var { year, skuName, lastCostPrice } of newCostPrices) {
      var costPriceDisplayElement = document.getElementById("cost-price-" + skuName + "-" + year);

      costPriceDisplayElement.textContent = lastCostPrice;
    }
  } else {
    for (var year of years) {
      for (var { skuName, lastCostPrice } of newCostPrices) {
        var costPriceDisplayElement = document.getElementById("cost-price-" + skuName + "-" + year);
        costPriceDisplayElement.textContent = lastCostPrice;
      }
    }
  }
};

export default updateCostPricesIntoSkusTable;
