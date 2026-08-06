import { Injectable } from '@nestjs/common';
import mongoose, { Model, ClientSession } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../../schemas/users.schema.js';
import { Goods, GoodsDocument } from '../../schemas/goods.schema.js';
import { Token, TokenDocument } from '../../schemas/tokens.schema.js';
import { Reports, ReportsDocument } from '../../schemas/reports.schema.js';
import {
  TaxParams,
  TaxParamsDocument,
} from '../../schemas/taxParams.schema.js';
import {
  ReportsTree,
  ReportsTreeDocument,
} from '../../schemas/reportsTree.schema.js';
import {
  ReportLoadingStates,
  ReportLoadingStatesDocument,
} from '../../schemas/reportLoadingState.schema.js';
import {
  WeeklyPricesAndDiscounts,
  WeeklyPricesAndDiscountsDocument,
} from '../../schemas/weeklyPricesAndDiscounts.schema.js';

import { getAll } from './utils/getAll.js';
import { resetUser } from './utils/resetUser.js';
import { createUserToDb } from './utils/createUserToDb.js';
import { getUserByLogin } from './utils/getUserByLogin.js';
import { getUserByUserId } from './utils/getUserByUserId.js';
import { deleteUserFromDb } from './utils/deleteUserFromDb.js';
import { deleteUsersFromDb } from './utils/deleteUsersFromDb.js';
import type { IUser } from '../../interfaces/users.interface.js';

@Injectable()
export class UsersModelServices {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,

    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,

    @InjectModel(Goods.name) private goodsModel: Model<GoodsDocument>,

    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,

    @InjectModel(Reports.name) private reportsModel: Model<ReportsDocument>,

    @InjectModel(TaxParams.name)
    private taxParamsModel: Model<TaxParamsDocument>,

    @InjectModel(ReportsTree.name)
    private reportsTreeModel: Model<ReportsTreeDocument>,

    @InjectModel(ReportLoadingStates.name)
    private reportLoadingStateModel: Model<ReportLoadingStatesDocument>,

    @InjectModel(WeeklyPricesAndDiscounts.name)
    private weeklyPricesAndDiscountsModel: Model<WeeklyPricesAndDiscountsDocument>,
  ) {}

  getAll: () => Promise<Users> = getAll;

  getUserByLogin: (login: string) => Promise<IUser | null> = getUserByLogin;

  getUserByUserId: (userId: string) => Promise<IUser> = getUserByUserId;

  createUserToDb: (userData: IUser, session: ClientSession) => Promise<void> =
    createUserToDb;

  resetUser: (userId: string) => Promise<void> = resetUser;

  deleteUserFromDb: (userId: string, session: ClientSession) => Promise<void> =
    deleteUserFromDb;

  deleteUsersFromDb: (session: ClientSession) => Promise<void> =
    deleteUsersFromDb;
}
