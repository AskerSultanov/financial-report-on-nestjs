import { getReportIdFromFileName } from './getReportIdFromFileName.js';
import { getReportPeriodFromPaidStorageReportFileName } from './getReportPeriodFromPaisStorageReportFileName.js';

var paidStorageReportFileName: string =
  'Отчёт по платному хранению (номенклатуры)';
var weeklyFinancialReportFileName: string =
  'Еженедельный детализированный отчет №';

interface IMapItem {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}

export interface IFiles {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  path: string;
  buffer: Buffer;
}

export interface IDeduplicatedFiles {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}

export var removeDublicateFiles = (
  files: IFiles[],
): { deduplicatedFiles: IDeduplicatedFiles[] } => {
  var uniqueFiles = new Map<number | string, IMapItem>();

  for (var { buffer, mimetype, originalname } of files) {
    var decodedFileName: string = Buffer.from(originalname, 'latin1').toString(
      'utf8',
    );

    if (
      originalname.startsWith(weeklyFinancialReportFileName) ||
      decodedFileName.startsWith(weeklyFinancialReportFileName)
    ) {
      originalname = originalname.startsWith(weeklyFinancialReportFileName)
        ? originalname
        : decodedFileName;
      var reportId: number = getReportIdFromFileName(originalname).reportId;

      if (!uniqueFiles.has(reportId)) {
        uniqueFiles.set(reportId, { buffer, mimetype, originalname });
      }
    } else if (originalname.startsWith(paidStorageReportFileName)) {
      var paidStorageReportPeriod: string =
        getReportPeriodFromPaidStorageReportFileName(
          originalname,
        ).paidStorageReportPeriod;

      if (!uniqueFiles.has(paidStorageReportPeriod)) {
        uniqueFiles.set(paidStorageReportPeriod, {
          buffer,
          mimetype,
          originalname,
        });
      }
    }
  }

  return { deduplicatedFiles: [...uniqueFiles.values()] };
};
