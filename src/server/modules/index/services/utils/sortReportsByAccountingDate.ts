import { IReportsWithAccountedFinances } from '../../../../database/interfaces/repots/index.interface.js';

export var sortReportsByAccountingDate = (
  reportsWithAccountedFinances: IReportsWithAccountedFinances[],
): IReportsWithAccountedFinances[] =>
  reportsWithAccountedFinances.sort(
    (a, b) => b.financesAccountedAt - a.financesAccountedAt,
  );
