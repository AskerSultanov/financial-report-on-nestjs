import { IReports } from '../../../interfaces/reports.interface.js';

export async function getAllDataFromReportCollection(): Promise<IReports[]> {
  var data = await this.reportsModel.find();

  return data.map((item: IReports) => item.toObject());
}
