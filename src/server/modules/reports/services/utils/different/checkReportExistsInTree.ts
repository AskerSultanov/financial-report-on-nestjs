import { IYearsPeriod } from '../../../../../database/interfaces/reportsTree.interface.js';

export var checkReportExistsInTree = (date: string, tree: IYearsPeriod[]) => {
  var reportIsExist: boolean = false;

  for (var { months } of tree) {
    for (var item of months) {
      if (item) {
        if (item.reportIds.find((report) => report?.dateFrom == date)) {
          reportIsExist = true;
          break;
        }
      }
    }
  }

  return { reportIsExist };
};
