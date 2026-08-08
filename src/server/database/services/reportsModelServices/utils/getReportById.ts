import { ClientSession } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { IReports } from '../../../interfaces/repots/index.interface.js';

export async function getReportById(
  userId: string,
  reportId: number,
  session: ClientSession | null | undefined,
): Promise<{ report: IReports }> {
  var sessionOpt = session ? { session: session } : {};
  var data = await this.reportsModel.findOne(
    { userId, 'reports.reportId': reportId },
    { 'reports.$': 1 },
    { ...sessionOpt },
  );

  if (!data?.reports.length) {
    throw new NotFoundException();
  }

  return { report: data.reports[0].toObject() };
}

export default getReportById;
