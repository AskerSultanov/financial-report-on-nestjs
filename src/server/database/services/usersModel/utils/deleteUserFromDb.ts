import { ClientSession } from 'mongoose';

interface Models {
  usersModel: any;
  goodsModel: any;
  tokenModel: any;
  reportsModel: any;
  taxParamsModel: any;
  reportPeriodsModel: any;
  reportLoadingStateModel: any;
  weeklyPricesAndDiscountsModel: any;
}

export async function deleteUserFromDb(
  this: Models,
  userId: string,
  session: ClientSession,
): Promise<void> {
  await this.usersModel.deleteOne({ userId }, { session });
  await this.goodsModel.deleteOne({ userId }, { session });
  await this.tokenModel.deleteOne({ userId }, { session });
  await this.reportsModel.deleteOne({ userId }, { session });
  await this.taxParamsModel.deleteOne({ userId }, { session });
  await this.reportPeriodsModel.deleteOne({ userId }, { session });
  await this.reportLoadingStateModel.deleteOne({ userId }, { session });
  await this.weeklyPricesAndDiscountsModel.deleteOne({ userId }, { session });
}
