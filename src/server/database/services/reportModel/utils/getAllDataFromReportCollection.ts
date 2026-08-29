import { IReport } from '../../../interfaces/report.interface.js';

export async function getAllDataFromReportCollection(): Promise<IReport[]> {
  var data = await this.reportsModel.find();

  return data.toObject();
}
