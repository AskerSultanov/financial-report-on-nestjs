export var generateColumnNames = (
  count: number,
): { columnsNames: string[] } => {
  var columnsNames: string[] = [];

  for (let i = 0; i < count; i++) {
    var num: number = i;
    var colName: string = '';

    while (num >= 0) {
      colName = String.fromCharCode((num % 26) + 65) + colName;
      num = Math.floor(num / 26) - 1;
    }
    columnsNames.push(colName);
  }

  return { columnsNames };
};
