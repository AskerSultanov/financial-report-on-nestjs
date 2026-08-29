import { join } from 'path';
import { Module } from '@nestjs/common';
import { ReportService } from './report.service.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ReportController } from './report.controller.js';
import { WBAPIUtils } from './services/utils/WBAPI/index.js';
import { CalcUtils } from './services/utils/calcUtil/index.js';
import { ReportTreeBuilderUtil } from './services/utils/reportTreeBuilder/index.js';
import { reportParserUtillUtil } from './services/utils/reportParsing/index.js';

@Module({
  providers: [
    CalcUtils,
    WBAPIUtils,
    ReportService,
    reportParserUtillUtil,
    ReportTreeBuilderUtil,
  ],
  controllers: [ReportController],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/report',
      rootPath: join(import.meta.dirname, '../../../src/client/html/report/'),
    }),
  ],
})
export class ReportModule {}
