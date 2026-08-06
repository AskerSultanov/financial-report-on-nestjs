import { ClientSession } from 'mongoose';
import {
  IReports,
  IReportsWithAccountedFinances,
} from '../../../interfaces/reports.interface.js';

export async function getReportsByUserId(
  userId: string,
  session: ClientSession | null | undefined,
  selectedFields: string[],
  reportIds: number[],
): Promise<{
  reports: IReports;
  reportsWithAccountedFinances?: IReportsWithAccountedFinances;
}> {
  var sessionOptions = session ? { session } : {};

  if (reportIds) {
    var projectFields: any = {};

    selectedFields.map((field) => {
      var key = field.split('.')[1];
      projectFields[key] = '$$r.' + key;
    });

    var data = await this.reportsModel.aggregate([
      {
        $match: {
          userId,
          'reports.reportId': { $in: reportIds },
        },
      },
      {
        $project: {
          reports: {
            $map: {
              input: {
                $filter: {
                  input: '$reports',
                  cond: { $in: ['$$this.reportId', reportIds] },
                },
              },
              as: 'r',
              in: projectFields,
            },
          },
          reportsWithAccountedFinances: 1,
        },
      },
    ]);

    return {
      reports: data[0].reports,
      reportsWithAccountedFinances: data[0]?.reportsWithAccountedFinances || [],
    };
  }

  if (selectedFields) {
    var { reports } = await this.reportsModel
      .findOne({ userId })
      .select(selectedFields);

    return { reports };
  }

  var data = await this.reportsModel.findOne({ userId }, null, {
    ...sessionOptions,
  });

  return { reports: data.toObject().reports };
}
