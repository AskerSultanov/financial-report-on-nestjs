export interface IReportPeriodsItem {
  year: number;
  reportId: number;
  dateFrom: string;
  dateTo: string;
  monthName: string;
  monthIndex: number;
}

export interface IReportPeriods {
  userId: string;
  reportPeriods: IReportPeriodsItem[];
}
