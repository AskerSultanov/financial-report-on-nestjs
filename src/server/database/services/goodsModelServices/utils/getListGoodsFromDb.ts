import { ClientSession } from 'mongodb';
import { ISku } from '../../../interfaces/goods.interface.js';

var projectQueries = ['listGoods.id', 'listGoods.skuName', 'listGoods.metrics'];

export async function getListGoodsFromDb(
  userId: string,
  skuNames: string[],
  session: ClientSession | null | undefined,
): Promise<{ listGoods: ISku[] }> {
  var sessionOption = session ? { session } : {};

  if (Array.isArray(skuNames) && skuNames.length) {
    var projectFields: any = {};

    projectQueries.map((field) => {
      var key = field.split('.')[1];
      projectFields[key] = '$$r.' + key;
    });

    var data = await this.goodsModel.aggregate(
      [
        { $match: { userId, 'listGoods.skuName': { $in: skuNames } } },
        {
          $project: {
            listGoods: {
              $map: {
                input: {
                  $filter: {
                    input: '$listGoods',
                    cond: { $in: ['$$this.skuName', skuNames] },
                  },
                },
                as: 'r',
                in: projectFields,
              },
            },
          },
        },
      ],
      { ...sessionOption },
    );

    return { listGoods: data[0].listGoods };
  } else {
    var data = await this.goodsModel.findOne({ userId }, null, {
      ...sessionOption,
    });

    return { listGoods: data.listGoods.toObject() };
  }
}
