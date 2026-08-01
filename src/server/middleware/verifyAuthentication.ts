import * as jose from 'jose';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Response, Request, NextFunction } from 'express';

var alg = 'RS256';

@Injectable()
export class VerifyAuthentication implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    var token = req.cookies?.token;
    if (!token) {
      return res.sendFile(
        join(
          import.meta.dirname,
          '../../src/public/html/decodeReportWithoutRegistration/index.html',
        ),
      );
    }

    try {
      var spki = this.configService.get<string>('spki');

      var publicKey = await jose.importSPKI(spki, alg);
      var { payload } = await jose.jwtVerify(token, publicKey);
    } catch (e) {
      res.clearCookie('token');
      return res.sendStatus(401);
    }

    req.payload = payload;
    next();
  }
}
