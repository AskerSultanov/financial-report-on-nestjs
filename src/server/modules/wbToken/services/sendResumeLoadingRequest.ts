var MAX_ATTEMPTS: number = 5;
var EXPECTED_STATUS_CODE: number = 202;
var NEXT_REQUEST_INTERVAL_MS: number = 5000;

var nextRequestDelay = async (): Promise<void> =>
  new Promise((res) => setTimeout(res, NEXT_REQUEST_INTERVAL_MS));

var doRequest = async (userId: string): Promise<Response> =>
  await fetch(process.env.REPORT_LOADER_URL_TO_RESUME_LOADING!, {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + process.env.SECRET_KEY,
    },
  });

export var sendResumeLoadingRequest = async (
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
