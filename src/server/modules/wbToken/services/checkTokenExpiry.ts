import { parseJwt } from './parseJwt.js';

import { IWBTokenPayload } from '../interfaces/wbTokenPayload.interface.js';

var mskTimeOffsetInSec: number = 10_800;

export var checkTokenExpiry = (token: string): boolean => {
  var payload: IWBTokenPayload = parseJwt(token);
  var currentTimestamp: number = Date.now() + mskTimeOffsetInSec;

  return !payload?.exp || payload.exp * 1000 <= currentTimestamp;
};
