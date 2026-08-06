var getGoodsData = async () => {
  var userId = document.cookie.split("=")[1];
  var url = "/goods/api/" + userId;

  var res = await fetch(url);

  if (!res.ok) {
    alert("some error message");
    return;
  }

  var { listGoods, weeklyPricesAndDiscounts } = await res.json();

  return { listGoods, weeklyPricesAndDiscounts };
};

export default getGoodsData;
