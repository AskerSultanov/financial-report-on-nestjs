import { ClientSession } from 'mongoose';
import { IReports } from '../../../interfaces/repots/index.interface.js';

var createQuery = (reports: any) => {
  var query: any = {};
  var arrayFilters = [];

  for (var report of reports) {
    var { reportId } = report;
    var key = `reports.$[report${reportId}]`;
    query[key] = report;

    arrayFilters.push({ [`report${reportId}.reportId`]: reportId });
  }

  return { query, arrayFilters };
};

export async function saveUpdatedReports(
  userId: string,
  reports: IReports[],
  session: ClientSession,
): Promise<void> {
  var { query, arrayFilters } = createQuery(reports);

  await this.reportsModel.updateOne(
    { userId },
    { $set: query },
    { arrayFilters, session: session },
  );
}
