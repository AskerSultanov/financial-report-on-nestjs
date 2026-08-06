import { join } from 'path';
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Response, Request, NextFunction } from 'express';

type Payload = {
  exp?: number | undefined;
  role?: string | undefined;
  userId?: string | undefined;
};

var roles = ['admin', 'user'];
var mskTimeOffsetInMs = 10_800_000;

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    var payload: Payload = req?.payload;
    var exp = payload?.exp;
    var role = payload?.role;
    var currentTimestamp = (Date.now() + mskTimeOffsetInMs) / 1000;

    if (currentTimestamp >= exp! || !role) {
      return res
        .clearCookie('token')
        .sendFile(
          join(
            import.meta.dirname,
            '../../src/client/html/decodeReportWithoutRegistration/index.html',
          ),
        );
    }
    if (roles.includes(role!)) {
      return next();
    }

    res.clearCookie('token');
    return res.sendStatus(403);
  }
}
