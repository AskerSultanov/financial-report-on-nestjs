import { WBAPIException } from '../../../../../../custopExceptions/wbapi.exception.js';

var MAX_ATTEMPTS = 3;

export async function getCreationStatus(
  url: string,
  token: string,
  userId: string,
): Promise<{ status: string }> {
  var res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  if (res.status === 200) {
    var result = await res.json();

    var { status } = result?.data;

    return { status };
  }

  var errMsg;

  switch (res.status) {
    case 400:
      errMsg = 'Неправильный запрос';
      break;
    case 401:
      errMsg =
        'Не удалось авторизоваться для получения статуса создания отчета о платном хранении с помощью сохраненного токена';
      break;
    case 429:
      errMsg = 'Подождите минуту перед получением нового отчёта';
      break;
    default:
      errMsg = 'Возникла ошибка при получении отчета о платном хранении';
  }

  throw new WBAPIException(errMsg, res.status, userId);
}

var waitForReportCreation = async () =>
  new Promise((res) => setTimeout(res, 5000));

export async function checkPaidStorageReportCreationStatus(
  taskId: string,
  token: string,
  userId: string,
): Promise<{ statusIsDone: boolean }> {
  var statusIsDone = true;
  var url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/status`;

  await waitForReportCreation();

  var { status } = await getCreationStatus(url, token, userId);

  if (status !== 'done') {
    var attempts = 0;
    statusIsDone = false;

    while (attempts < MAX_ATTEMPTS) {
      await waitForReportCreation();

      var { status } = await getCreationStatus(url, token, userId);

      if (status === 'done') {
        statusIsDone = true;
        break;
      }

      attempts++;
    }
  }

  return { statusIsDone };
}

export default checkPaidStorageReportCreationStatus;
