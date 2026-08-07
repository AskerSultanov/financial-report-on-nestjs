import { IAdvertisingReportItem } from '../interfaces/getReports.interface.js';
import { WBAPIException } from '../../../../../../custopExceptions/wbapi.exception.js';

export async function getAdvertisingCostsReportFromWBAPI(
  dateFrom: string,
  dateTo: string,
  token: string,
  userId: string,
): Promise<IAdvertisingReportItem[] | []> {
  var url = `https://advert-api.wildberries.ru/adv/v1/upd?from=${dateFrom}&to=${dateTo}`;

  var res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  if (res.status === 200) {
    var advertisingReport = await res.json();
    return advertisingReport;
  }

  var errMsg = '';

  switch (res.status) {
    case 400:
      errMsg = 'Неправильный запрос';
      break;
    case 401:
      errMsg =
        'Не удалось авторизоваться для получения отчета о затратах на рекламу с помощью сохраненного токена. Получить токен с нужными правами можно получить в личном кабинете продавца';
      break;
    case 429:
      errMsg = 'Подождите минуту перед получением нового отчёта';
      break;
    default:
      errMsg =
        'Возникла ошибка при получении истории затрат на рекламу, попробуйте позже';
  }

  throw new WBAPIException(errMsg, res.status, userId);
}

export default getAdvertisingCostsReportFromWBAPI;
