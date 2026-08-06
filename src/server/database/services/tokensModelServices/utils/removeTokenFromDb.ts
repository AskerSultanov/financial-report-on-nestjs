export async function removeTokenFromDb(userId: string): Promise<number> {
  return (
    await this.tokenModel.updateOne(
      { userId },
      { $set: { token: '', tokenHasBeenRemoved: true } },
    )
  ).modifiedCount;
}
