var oneMinuteMs: number = 60_000;
var mskTimeOffsetInMs: number = 10_800_000;

export var shouldWaitBeforeNextRequest = (
  lastReportRequestTimestamp: number,
): { nextRequestDelayMs: number } => {
  var nextRequestDelayMs: number = 0;

  if (lastReportRequestTimestamp === 0) {
    return { nextRequestDelayMs };
  }

  var currentTimeMs: number = Date.now() + mskTimeOffsetInMs;
  var difference: number = currentTimeMs - lastReportRequestTimestamp;
  var hasMinutePassed: boolean = difference > oneMinuteMs;

  if (hasMinutePassed) {
    return { nextRequestDelayMs };
  }

  return { nextRequestDelayMs: oneMinuteMs - difference };
};
