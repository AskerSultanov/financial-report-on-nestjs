export var getReportIdFromFileName = (
  fileName: string,
): { reportId: number } => {
  var reportIdWithFileExtension: string = fileName.split('№')[1];
  var reportId: number = +reportIdWithFileExtension.split('_')[0];
  return { reportId };
};
