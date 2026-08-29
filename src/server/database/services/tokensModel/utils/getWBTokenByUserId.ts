import { ClientSession } from 'mongoose';
import { IToken } from '../../../interfaces/tokens.interface.js';

var mskTimeOffsetInMs = 10_800_000;

export async function getWBTokenByUserId(
  userId: string,
  session: ClientSession | null | undefined,
  updateLastUsedNow: boolean = false,
): Promise<{ token: string; lastUsed: Date }> {
  var sessionOpt = session ? { session: session } : {};

  var data: IToken;

  if (updateLastUsedNow) {
    data = await this.token.findOneAndUpdate(
      { userId },
      { $set: { lastUsed: Date.now() + mskTimeOffsetInMs } },
      { returnDocument: 'before', ...sessionOpt },
    );
  } else {
    data = await this.tokens.findOne({ userId }, null, { ...sessionOpt });
  }

  return { token: data.token, lastUsed: data?.lastUsed };
}
