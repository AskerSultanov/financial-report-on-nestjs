export async function deleteTaxYears(userId: string): Promise<void> {
  await this.taxParamsModel.updateOne(
    { userId },
    {
      $set: { years: [] },
    },
  );
}
