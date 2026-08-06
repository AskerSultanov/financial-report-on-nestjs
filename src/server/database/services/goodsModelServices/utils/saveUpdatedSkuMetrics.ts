import { ClientSession } from 'mongoose';
import { ISkuMetrics } from '../../../interfaces/goods.interface.js';

export async function saveUpdatedSkuMetrics(
  userId: string,
  skuId: number,
  metrics: ISkuMetrics[],
  session: ClientSession,
): Promise<void> {
  await this.goodsModel.updateOne(
    { userId, 'listGoods.id': skuId },
    { $set: { 'listGoods.$[sku].metrics': metrics } },
    { arrayFilters: [{ 'sku.id': skuId }], session: session },
  );
}
        