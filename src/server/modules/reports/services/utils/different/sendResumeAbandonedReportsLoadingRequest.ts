var MAX_ATTEMPTS: number = 5;
var EXPECTED_STATUS_CODE: number = 202;
var NEXT_REQUEST_INTERVAL_MS: number = 5000;
var url: string = process.env.REPORT_LOADER_URL_TO_RESUME_ABANDONED_LOADING!;

var nextRequestDelay = async () =>
  new Promise((res) => setTimeout(res, NEXT_REQUEST_INTERVAL_MS));

var doRequest = async (userId: string): Promise<Response> =>
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.SECRET_KEY,
    },
  });

export var sendResumeAbandonedReportsLoadingRequest = async (
  userId: string,
): Promise<boolean> => {
  var attempt: number = 0;
  var success: boolean = false;

  while (attempt < MAX_ATTEMPTS) {
    try {
      var res: Response = await doRequest(userId);
      if (res.status === EXPECTED_STATUS_CODE) {
        success = true;

        break;
      } else {
        attempt++;
      }
    } catch (e) {
      attempt++;
    }

    await nextRequestDelay();
  }

  return success;
};
