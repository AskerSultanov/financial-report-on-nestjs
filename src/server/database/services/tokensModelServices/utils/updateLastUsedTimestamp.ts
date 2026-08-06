import { ClientSession } from 'mongoose';

var mskTimeOffsetInMs = 10_800_000;

export async function updateLastUsedTimestamp(
  userId: string,
  session: ClientSession | null | undefined,
): Promise<void> {
  var sessionOpt = session ? { session: session } : {};
  await this.tokenModel.updateOne(
    { userId },
    { $set: { lastUsed: Date.now() + mskTimeOffsetInMs } },
    { ...sessionOpt },
  );
}
