import { IWBTokenPayload } from '../../interfaces/wbTokenPayload.interface.js';

var msInSec: number = 1000;

export var checkTokenExpiry = (
  tokenPayload: IWBTokenPayload,
): { isExpired: boolean } => {
  if (!tokenPayload?.exp) {
    throw new Error('Invalid WBTOKEN: payload is missing');
  }

  var currentTimestamp: number = Date.now();

  var isExpired: boolean = tokenPayload.exp * msInSec <= currentTimestamp;

  return { isExpired };
};
