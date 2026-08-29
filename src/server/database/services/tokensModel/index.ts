import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { Token, TokenDocument } from '../../schemas/tokens.schema.js';

import { saveWBTokenToDb } from './utils/saveWBTokenToDb.js';
import { removeTokenFromDb } from './utils/removeTokenFromDb.js';
import { getWBTokenByUserId } from './utils/getWBTokenByUserId.js';
import { updateLastUsedTimestamp } from './utils/updateLastUsedTimestamp.js';

@Injectable()
export class TokensModelServices {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  getWbTokenByUserId: (
    userId: string,
    session: ClientSession | null | undefined,
    updateLastUsedNow: boolean,
  ) => Promise<{ token: string; lastUsed: Date }> = getWBTokenByUserId;

  saveTokenToDb: (
    userId: string,
    token: string,
    sessin: any,
  ) => Promise<number> = saveWBTokenToDb;

  removeTokenFromDb: (userId: string) => Promise<number> = removeTokenFromDb;

  updateLastUsedTimestamp: (
    userId: string,
    session: ClientSession | null | undefined,
  ) => Promise<void> = updateLastUsedTimestamp;
}
