import JSZip from 'jszip';
import { Buffer } from 'node:buffer';
import { getReportIdFromFileName } from './getReportIdFromFileName.js';

import { IDeduplicatedFiles } from './removeDublicateFiles.js';

export interface IWeeklyFinancialReportsBuffer {
  buffer: Buffer;
  reportId: number;
}

var zipFileMimeTypes: string[] = [
  'application/zip',
  'application/x-zip-compressed',
];
var xlsxFileMimeType: string =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

var paidStorageReportFileName: string =
  'Отчёт по платному хранению (номенклатуры)';
var weeklyFinancialReportFileName: string =
  'Еженедельный детализированный отчет №';

export var extractReportsFileBufferFromZip = async (
  fileBuffers: IDeduplicatedFiles[],
): Promise<{
  paidStorageReportsBuffer: Buffer[] | undefined;
  weeklyFinancialReportsBuffer: IWeeklyFinancialReportsBuffer[] | [];
}> => {
  var paidStorageReportsBuffer: Buffer[] = [];
  var weeklyFinancialReportsBuffer: IWeeklyFinancialReportsBuffer[] = [];

  for (var { buffer, mimetype, originalname } of fileBuffers) {
    if (zipFileMimeTypes.includes(mimetype)) {
      var zip: any = new JSZip();

      await zip
        .loadAsync(buffer, { base64: true })
        .then(async (zipData: any) => {
          var files: any = zipData.files;

          for (var file of Object.keys(files)) {
            var nestedFileName: string = files[file].name;

            var xlsxBuffer: Buffer = await zip
              .file(nestedFileName)
              .async('nodebuffer');

            if (isPaidStorageReportFileName(paidStorageReportFileName)) {
              paidStorageReportsBuffer.push(xlsxBuffer);
            } else if (
              isWeeklyFinancialReportFileName(weeklyFinancialReportFileName)
            ) {
              var reportId: number =
                getReportIdFromFileName(originalname).reportId;

              weeklyFinancialReportsBuffer.push({
                reportId,
                buffer: xlsxBuffer,
              });
            }
          }
        });
    } else if (mimetype === xlsxFileMimeType) {
      if (isPaidStorageReportFileName(paidStorageReportFileName)) {
        paidStorageReportsBuffer.push(buffer);
      } else if (
        isWeeklyFinancialReportFileName(weeklyFinancialReportFileName)
      ) {
        var reportId: number = getReportIdFromFileName(originalname).reportId;

        weeklyFinancialReportsBuffer.push({ reportId, buffer });
      }
    }
  }

  return { paidStorageReportsBuffer, weeklyFinancialReportsBuffer };
};

function isPaidStorageReportFileName(fileName: string): boolean {
  return (
    fileName
      ?.split(' ')
      ?.slice(1)
      ?.join(' ')
      ?.startsWith(paidStorageReportFileName) ?? false
  );
}

function isWeeklyFinancialReportFileName(fileName: string): boolean {
  return fileName?.startsWith(weeklyFinancialReportFileName);
}
