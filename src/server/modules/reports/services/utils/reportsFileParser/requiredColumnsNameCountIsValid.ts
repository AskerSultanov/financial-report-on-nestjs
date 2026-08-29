import { IRawRequiredColumnsNameToPaidStorageReport } from './getRequiredColumnsNameFromPaidStorageReportFile.js';
import { IRawRequiredColumnsNameToWeeklyFinancialReport } from './getRequiredColumnsNameFromWeeklyFinanfialReportFile.js';

export var requiredColumnsNameCountIsValid = (
  requiredColumnsName:
    | IRawRequiredColumnsNameToWeeklyFinancialReport
    | IRawRequiredColumnsNameToPaidStorageReport,
  expectedQtyOfRequiredColumnsName: number,
): boolean =>
  Object.keys(requiredColumnsName).length === expectedQtyOfRequiredColumnsName;
