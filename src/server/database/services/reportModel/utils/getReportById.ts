import { ClientSession } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { IReport } from '../../../interfaces/report.interface.js';

export async function getReportById(
  userId: string,
  reportId: number,
  session: ClientSession | null | undefined,
): Promise<{ report: IReport }> {
  var sessionOpt = session ? { session: session } : {};

  var data = await this.reportsModel.findOne({ userId, reportId }, null, {
    ...sessionOpt,
  });

  if (!data?.reports.length) {
    throw new NotFoundException();
  }

  return { report: data.reports[0].toObject() };
}

export default getReportById;
