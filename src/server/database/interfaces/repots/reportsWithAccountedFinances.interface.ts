export interface IReportsWithAccountedFinances {
  userId: string;
  dateFrom: string;
  dateTo: string;
  reportId: number;
  tax: number;
  financesAccountedAt: number;
  profit: number;
  margin: number;
  productCosts: number;
  insuranceFee: number;
  additionalInsuranceFee: number;
}