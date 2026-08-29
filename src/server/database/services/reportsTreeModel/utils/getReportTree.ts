import { ClientSession } from 'mongoose';
import { IYearsPeriod } from '../../../interfaces/reportsTree.interface.js';

export async function getReportTree(
  userId: string,
  session: ClientSession | null | undefined,
): Promise<{ reportTree: IYearsPeriod[] }> {
  var sessionOpt = session ? { session: session } : {};
  var data = await this.reportsTreeModel.findOne({ userId }, null, {
    ...sessionOpt,
  });

  return { reportTree: data.years };
}
