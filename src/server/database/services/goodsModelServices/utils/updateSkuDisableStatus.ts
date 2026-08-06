export async function updateSkuDisableStatus(
  userId: string,
  skuName: string,
  disabled: boolean,
): Promise<void> {
  await this.goodsModel.updateOne(
    { userId, 'listGoods.skuName': skuName },
    { $set: { 'listGoods.$.disabled': disabled } },
  );
}
