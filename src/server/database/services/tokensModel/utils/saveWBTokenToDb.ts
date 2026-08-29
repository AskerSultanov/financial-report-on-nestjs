import { ClientSession } from 'mongoose';
export async function saveWBTokenToDb(
  userId: string,
  token: string,
  session: ClientSession,
): Promise<number> {
  var result = await this.tokenModel.updateOne(
    { userId },
    {
      $set: { token, tokenHasBeenRemoved: false },
    },
    {
      session: session,
    },
  );

  return result.modifiedCount;
}
