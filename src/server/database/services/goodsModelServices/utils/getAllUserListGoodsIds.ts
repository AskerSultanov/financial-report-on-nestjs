import { IGoods } from '../../../interfaces/goods.interface.js';

export async function getAllUserListGoodsIds() {
  var data: IGoods[] = await this.goodsModel.find(
    {},
    { _id: 0, userId: 1, 'listGoods.id': 1, 'listGoods.disabled': 1 },
  );

  return data.map(({ userId, listGoods }) => {
    return {
      userId,
      listGoodsIds: listGoods.map(({ id }) => id),
      listGoodsIdsAndDisableStatuses: listGoods,
    };
  });
}
