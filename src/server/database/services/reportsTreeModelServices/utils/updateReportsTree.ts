import { ClientSession } from 'mongoose';
import { IReportsTree } from '../../../interfaces/reportsTree.interface.js';

export async function updateReportsTree(
  userId: string,
  years: IReportsTree,
  session: ClientSession | null | undefined,
): Promise<void> {
  var sessionOptions = session ? { session } : {};

  await this.reportsTreeModel.updateOne(
    { userId },
    {
      $set: { years: years },
    },
    {
      ...sessionOptions,
    },
  );
}
