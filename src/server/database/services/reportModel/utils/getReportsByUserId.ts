import { ClientSession } from 'mongoose';
import { IReport } from '../../../interfaces/report.interface.js';

export async function getReportsByUserId(
  userId: string,
  session: ClientSession | null | undefined,
  selectedFields: string[],
  reportIds: number[],
): Promise<{
  reports: IReport[];
}> {
  var sessionOptions = session ? { session } : {};

  if (reportIds) {
    var data = await this.reportsModel.find({
      userId,
      reportId: { $in: [reportIds] },
    });

    return { reports: data };
  }

  if (selectedFields) {
    var { reports } = await this.reportsModel
      .find({ userId }, null, { ...sessionOptions })
      .select(selectedFields);

    return { reports };
  }

  var reports = await this.reportsModel.find({ userId }, null, {
    ...sessionOptions,
  });
  return { reports };
}
