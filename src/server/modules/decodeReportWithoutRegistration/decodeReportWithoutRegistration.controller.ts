import { join } from 'path';
import type { Response } from 'express';
import { Public } from '../auth/publicMetadata.js';
import { Get, Res, Controller } from '@nestjs/common';

@Public()
@Controller('decode-report-without-registration')
export class DecodeReportWithoutRegistrationController {
  @Get()
  get(@Res() res: Response) {
    return res.sendFile(
      join(
        import.meta.dirname,
        '../../../src/client/html/decodeReportWithoutRegistration/index.html',
      ),
    );
  }
}
