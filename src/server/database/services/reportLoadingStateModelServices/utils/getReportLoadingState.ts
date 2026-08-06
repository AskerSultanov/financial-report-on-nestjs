import { ClientSession } from 'mongoose';
import { IReportLoadingStates } from '../../../interfaces/reportLoadingState.interface.js';

export async function getReportLoadingState(
  userId: string,
  session: ClientSession | null | undefined,
  selectedFields: string[] = [''],
): Promise<IReportLoadingStates> {
  var sessionOptions = session ? { session: session } : {};
  var doc = await this.reportLoadingStateModel
    .findOne({ userId }, { _id: 0 }, { ...sessionOptions })
    .select(selectedFields);
  return doc.toObject();
}
