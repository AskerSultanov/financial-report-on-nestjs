import { join } from 'path';
import { Module } from '@nestjs/common';
import { ReportService } from './report.service.js';
import { ReportController } from './report.controller.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WBAPIUtils } from './services/utils/WBAPI/index.js';
import { ReportTreeBuilderUtil } from './services/utils/reportTreeBuilder/index.js';

@Module({
  providers: [ReportService, WBAPIUtils, ReportTreeBuilderUtil],
  controllers: [ReportController],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/report',
      rootPath: join(import.meta.dirname, '../../../src/client/html/report/'),
    }),
  ],
})
export class ReportModule {}
