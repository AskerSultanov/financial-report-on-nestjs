import { join } from 'path';
import { Module } from '@nestjs/common';
import { DecodeReportWithoutRegistrationController } from './decodeReportWithoutRegistration.controller.js';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  providers: [],
  controllers: [DecodeReportWithoutRegistrationController],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/decode-report-without-registration',
      rootPath: join(import.meta.dirname, '../../../src/client/html/decodeReportWithoutRegistration/'),
    }),
  ],
})
export class DecodeReportWithoutRegistrationModule {}
