var compareCurrentValuesWithNew = (item, newPrice, newDiscount) => {
  var actualPrice = document.getElementById(item.skuName + "-price");
  var actualDiscount = document.getElementById(item.skuName + "-discount");
  var expectedPrice = document.getElementById(item.skuName + "-price-expected");
  var expectedDiscount = document.getElementById(item.skuName + "-discount-expected");

  var currentPrice = +expectedPrice?.textContent || +actualPrice.textContent;
  var currentDiscount = +expectedDiscount?.textContent || +actualDiscount.textContent;

  var newAndCurrentPriceAreEqual = newPrice === currentPrice;
  var newAndCurentDiscountAreEqual = newDiscount === currentDiscount;

  if (newAndCurrentPriceAreEqual && newAndCurentDiscountAreEqual) {
    alert(`Текущие значения уже установлены, введите новые`);
    return { valuesAreNotEqual: false };
  }

  return { valuesAreNotEqual: true };
};

export default compareCurrentValuesWithNew;
