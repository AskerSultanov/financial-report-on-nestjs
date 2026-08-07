import { IRawListGoods } from '../../interfaces/rawListGoods.interface.js';
import { WBAPIException } from '../../../../../../../custopExceptions/wbapi.exception.js';

export async function getGoodsListFromWBAPI(
  userId: string,
  token: string,
): Promise<{ rawListGoogs: IRawListGoods } | undefined> {
  var url =
    'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter?limit=1000';

  var res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  var data = await res.json();

  if (res.status === 200) {
    var { listGoods } = data.data;
    return { rawListGoogs: listGoods };
  }

  var errMsg;

  switch (res.status) {
    case 400:
      errMsg = 'Неправильный запрос\nДетали:' + data.errorText;
      break;
    case 401:
      errMsg =
        'Не удалось авторизоваться для получения списка товаров с помощью сохраненного токена\nДетали:' +
        data.errorText;
      break;
    case 402:
      errMsg = 'Требуется платеж\nДетали:' + data.errorText;
      break;
    case 403:
      errMsg = 'Доступ запрещен\nДетали:' + data.errorText;
      break;
    case 429:
      errMsg =
        'Подождите минуту перед получением списка товаров\nДетали:' +
        data.errorText;
      break;
    default:
      errMsg =
        'Возникла ошибка при получении списка товаров, попробуйте позже\nДетали:' +
        data.errorText;
  }

  throw new WBAPIException(errMsg, res.status, userId);
}

export default getGoodsListFromWBAPI;
