import { getYearIndex } from './utils/getYearIndex.js';
import { checkYearExists } from './utils/checkYearExists.js';
import { updateYearStructure } from './utils/updateYearStructure.js';
import { createNextYearMonths } from './utils/createNextYearMonths.js';
import { getMonthNameAndIndex } from './utils/getMonthNameAndIndex.js';
import { isNextMonthReportNeeded } from './utils/isNextMonthReportNeeded.js';
import { insertMonthDataToMonths } from './utils/insertMonthDataToMonths.js';
import { getFirstMonthFromNextYear } from './utils/getFirstMonthFromNextYear.js';
import { insertReportIdAndFullPeriodToReportIds } from './utils/insertReportIdAndFullPeriodToReportIds.js';

import { IYearsPeriod } from '../../../../../database/interfaces/reportsTree.interface.js';

export class ReportTreeBuilderUtil {
  insertReportToReportTree(
    dateFrom: string,
    dateTo: string,
    reportId: number,
    years: IYearsPeriod[],
  ): { years: IYearsPeriod[]; year: number; month: string } {
    var [startYear, startMonth] = dateFrom.split('-').map(Number);
    var [endYear, endMonth] = dateTo.split('-').map(Number);

    var fullPeriod = { dateFrom, dateTo };
    var startMonthName = getMonthNameAndIndex(startMonth).monthName;
    var endMonthName = getMonthNameAndIndex(endMonth).monthName;

    var yearExists = checkYearExists(years, startYear);

    if (!yearExists) {
      return handleYearDoesNotExist();
    }

    return handleYearExists();

    function handleYearDoesNotExist() {
      if (startYear !== endYear) {
        return handleCrossYearWhenYearDoesNotExist();
      }

      return handleSameYearWhenYearDoesNotExist();
    }

    function handleCrossYearWhenYearDoesNotExist() {
      if (isNextMonthReportNeeded(dateFrom, dateTo)) {
        return insertIntoEndYearWhenStartYearMissing();
      }

      var months = insertMonthDataToMonths(reportId, fullPeriod, dateFrom);
      years.push({ year: startYear, months });

      return { years, year: startYear, month: startMonthName };
    }

    function insertIntoEndYearWhenStartYearMissing() {
      var endYearExist = checkYearExists(years, endYear);

      if (endYearExist) {
        var endYearIndex = getYearIndex(years, endYear);
        var { months } = years[endYearIndex];

        var { month, reportIds } = getFirstMonthFromNextYear(months);
        var updatedReportIds = insertReportIdAndFullPeriodToReportIds(
          dateTo,
          fullPeriod,
          reportId,
          'overlap - yes',
          reportIds,
        );

        months[11] = { month, reportIds: updatedReportIds };
        years[endYearIndex] = { year: endYear, months };

        return { years, year: endYear, month: endMonthName };
      } else {
        let reportIds = insertReportIdAndFullPeriodToReportIds(
          dateTo,
          fullPeriod,
          reportId,
          'overlap - yes',
        );
        let months = createNextYearMonths(reportIds);
        years.push({ year: endYear, months });

        return { years, year: endYear, month: endMonthName };
      }
    }

    function handleSameYearWhenYearDoesNotExist() {
      if (isNextMonthReportNeeded(dateFrom, dateTo)) {
        var months = insertMonthDataToMonths(
          reportId,
          fullPeriod,
          dateTo,
          'carry',
        );
        years.push({ year: startYear, months });

        return { years, year: startYear, month: endMonthName };
      }

      var months = insertMonthDataToMonths(reportId, fullPeriod, dateFrom);
      years.push({ year: startYear, months });

      return { years, year: startYear, month: startMonthName };
    }

    function handleYearExists() {
      if (startYear !== endYear) {
        return handleCrossYearWhenYearExists();
      }

      return handleSameYearWhenYearExists();
    }

    function handleCrossYearWhenYearExists() {
      if (isNextMonthReportNeeded(dateFrom, dateTo)) {
        return insertIntoEndYearWhenStartYearExists();
      }

      var yearIndex = getYearIndex(years, startYear);
      let { months } = years[yearIndex];

      years[yearIndex] = updateYearStructure(
        months,
        startYear,
        startMonth,
        dateFrom,
        reportId,
        fullPeriod,
        'overlap - no',
      );

      return { years, year: startYear, month: startMonthName };
    }

    function insertIntoEndYearWhenStartYearExists() {
      var nextYearExists = checkYearExists(years, endYear);

      if (!nextYearExists) {
        var reportIds = insertReportIdAndFullPeriodToReportIds(
          dateTo,
          fullPeriod,
          reportId,
          'overlap - yes',
        );
        var months = createNextYearMonths(reportIds);
        years.push({ year: endYear, months });

        return { years, year: endYear, month: endMonthName };
      }

      var yearIndex = getYearIndex(years, endYear);
      var { months } = years[yearIndex];

      years[yearIndex] = updateYearStructure(
        months,
        endYear,
        endMonth,
        dateTo,
        reportId,
        fullPeriod,
        'overlap - yes',
      );

      return { years, year: endYear, month: endMonthName };
    }

    function handleSameYearWhenYearExists() {
      var yearIndex = getYearIndex(years, startYear);
      var { months } = years[yearIndex];

      if (isNextMonthReportNeeded(dateFrom, dateTo)) {
        years[yearIndex] = updateYearStructure(
          months,
          startYear,
          endMonth,
          dateTo,
          reportId,
          fullPeriod,
          'overlap - yes',
        );

        return { years, year: startYear, month: endMonthName };
      }

      years[yearIndex] = updateYearStructure(
        months,
        startYear,
        startMonth,
        dateFrom,
        reportId,
        fullPeriod,
        'overlap - no',
      );

      return { years, year: startYear, month: startMonthName };
    }
  }
}
