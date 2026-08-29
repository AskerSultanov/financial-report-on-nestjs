export interface IData {
  userId: string;
  nextRequestDelayMs: number;
  isPeriodWithinSameWeek?: boolean;
  needsReportLoadingDelay?: boolean;
  dateTo: string;
  needToLoadAllReports?: boolean;
  dateFrom: string;
}

export var sendReportPeriodsToReportLoader = async (
  data: IData,
): Promise<{ status: number }> => {
  var res: Response = await fetch(process.env.REPORT_LOADER_URL!, {
    method: 'POST',
    body: JSON.stringify({ ...data }),
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + process.env.SECRET_KEY,
    },
  });

  return { status: res.status };
};
