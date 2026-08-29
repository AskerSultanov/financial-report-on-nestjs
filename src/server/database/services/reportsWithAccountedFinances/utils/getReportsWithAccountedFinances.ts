import { IReportsWithAccountedFinances } from '../../../interfaces/reportsWithAccountedFinances.interface.js';

export async function getReportsWithAccountedFinances(
  userId: string,
): Promise<{ reportsWithAccountedFinances: IReportsWithAccountedFinances[] }> {
  var data = await this.reportsWithAccountedFinancesModel.find({ userId });
  return { reportsWithAccountedFinances: data };
}
