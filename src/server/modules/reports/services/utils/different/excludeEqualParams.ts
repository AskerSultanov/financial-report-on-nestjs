var excludeEqualParams = (prevData: any, currentData: any) => {
  var nonEqualParams = {};

  var prevDataKeys: string[] = Object.keys(prevData);
  var currentDataKeys: string[] = Object.keys(currentData);

  for (var currentDataKey of currentDataKeys) {
    var prevDataKey = prevDataKeys.find((key) => key === currentDataKey);

    if (prevDataKey) {
      var prevDataValue = prevData[prevDataKey];
      var currentDataValue = currentData[currentDataKey];

      if (
        prevDataValue !== currentDataValue &&
        !currentDataKey.startsWith('costPrice')
      ) {
        nonEqualParams = Object.assign(nonEqualParams, {
          [currentDataKey]: currentDataValue,
        });
      }
    }
  }

  return nonEqualParams;
};

export default excludeEqualParams;
