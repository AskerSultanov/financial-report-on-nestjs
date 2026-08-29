export interface ISkusLastCostPrice {
  id: number;
  skuName: string;
  lastCostPrice: number;
}

export async function getSkusLastCostPrice(
  userId: string,
): Promise<{ skusLastCostPrice: ISkusLastCostPrice[] }> {
  var data = await this.goodsModel.findOne(
    { userId },
    {
      'listGoods.id': 1,
      'listGoods.skuName': 1,
      'listGoods.lastCostPrice': 1,
      _id: 0,
    },
  );

  return { skusLastCostPrice: data.listGoods };
}
