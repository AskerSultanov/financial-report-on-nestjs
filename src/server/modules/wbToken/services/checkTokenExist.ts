import { parseJwt } from './utils/parseJwt.js';
import { checkTokenExpiry } from './utils/checkTokenExpiry.js';

import { IWBTokenPayload } from '../interfaces/wbTokenPayload.interface.js';

var tokenMissingMsg: string = 'Отсутствует токен личного кабинета WB';
var tokenExpiryMsg: string = 'Истек срок действия токена личного кабинета WB';

export async function checkTokenExist(
  userId: string,
): Promise<{ token: string; errorText: string }> {
  var { token } = await this.wbTokenModelServices.getWbTokenByUserId(userId);

  if (!token) {
    return { token: '', errorText: tokenMissingMsg };
  }

  var tokenPayload: IWBTokenPayload = parseJwt(token);

  var { isExpired } = checkTokenExpiry(tokenPayload);

  if (isExpired) {
    return { token: '', errorText: tokenExpiryMsg };
  }

  return { token, errorText: '' };
}
