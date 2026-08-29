import { IWBTokenPayload } from '../interfaces/wbTokenPayload.interface.js';

var testTokenValue: number = 2; //https://dev.wildberries.ru/docs/openapi/api-information#tag/Avtorizaciya/Kak-ustroen-token

export var isTestToken = (token: IWBTokenPayload): Boolean =>
  token.acc === testTokenValue;
