import { Injectable } from '@nestjs/common';
import { checkTokenExist } from './services/checkTokenExist.js';
import { TokensModelServices } from '../../database/services/index.js';

@Injectable()
export class WBTokenServices {
  constructor(private readonly wbTokenModelServices: TokensModelServices) {}

  checkTokenExist: (
    userId: string,
  ) => Promise<{ token: string; errorText: string }> = checkTokenExist;
}
