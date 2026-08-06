import { join } from 'path';
import * as jose from 'jose';
import { ConfigService } from '@nestjs/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Response, Request, NextFunction } from 'express';

var alg = 'RS256';

type tokenType = string | undefined;

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    var token: tokenType = req.cookies?.token;

    if (!token) {
      return res.sendFile(
        join(
          import.meta.dirname,
          '../../src/client/html/decodeReportWithoutRegistration/index.html',
        ),
      );
    }

    try {
      var spki = this.configService.get('spki');

      var publicKey = await jose.importSPKI(spki, alg);
      var { payload } = await jose.jwtVerify(token, publicKey);
      req.payload = payload;
    } catch (e) {
      return res.clearCookie('token').sendStatus(401);
    }

    next();
  }
}
