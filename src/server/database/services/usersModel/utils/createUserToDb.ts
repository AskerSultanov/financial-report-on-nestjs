import argon2 from 'argon2';
import { ClientSession } from 'mongoose';
import { IUser } from '../../../interfaces/users.interface.js';

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

var mskTimeOffsetInMs = 10_800_000;

export async function createUserToDb(
  this: Models,
  userData: IUser,
  session: ClientSession,
): Promise<void> {
  var { userId, role, login, passwd } = userData;
  var hashedPasswd = await argon2.hash(passwd + '');

  await this.goodsModel.insertOne({ userId }, { session });
  await this.tokenModel.insertOne({ userId }, { session });
  await this.reportsModel.insertOne({ userId }, { session });
  await this.taxParamsModel.insertOne({ userId }, { session });
  await this.reportsTreeModel.insertOne({ userId }, { session });
  await this.reportLoadingStateModel.insertOne({ userId }, { session });
  await this.weeklyPricesAndDiscountsModel.insertOne({ userId }, { session });
  await this.usersModel.insertOne(
    {
      login,
      userId,
      role,
      passwd: hashedPasswd,
      registeredAt: new Date(Date.now() + mskTimeOffsetInMs),
    },
    { session },
  );
}
