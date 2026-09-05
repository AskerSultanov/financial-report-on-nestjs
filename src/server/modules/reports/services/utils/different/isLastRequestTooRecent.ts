export var isLastRequestTooRecent = (
  lastReportRequestTimestamp: number,
  nestReportDelayMs: number = 65_000,
): { needToDelay: boolean; delayInMs: number } => {
  var delayInMs: number = 0;

  var currentTimestamp: number = Date.now();

  var difference: number = currentTimestamp - lastReportRequestTimestamp;

  var needToDelay: boolean = difference < nestReportDelayMs;

  if (needToDelay) {
    delayInMs = nestReportDelayMs - difference;
  }

  return { needToDelay, delayInMs };
};
