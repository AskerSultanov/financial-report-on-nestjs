import { ClientSession } from 'mongoose';

interface Models {
  usersModel: any;
  goodsModel: any;
  tokenModel: any;
  reportsModel: any;
  taxParamsModel: any;
  reportsTreeModel: any;
  reportLoadingStateModel: any;
  weeklyPricesAndDiscountsModel: any;
}

export async function deleteUsersFromDb(
  this: Models,
  session: ClientSession,
): Promise<void> {
  await this.usersModel.deleteMany({}, { session });
  await this.goodsModel.deleteMany({}, { session });
  await this.tokenModel.deleteMany({}, { session });
  await this.reportsModel.deleteMany({}, { session });
  await this.taxParamsModel.deleteMany({}, { session });
  await this.reportsTreeModel.deleteMany({}, { session });
  await this.reportLoadingStateModel.deleteMany({}, { session });
  await this.weeklyPricesAndDiscountsModel.deleteMany({}, { session });
}
