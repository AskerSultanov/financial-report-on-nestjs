import { join } from 'path';
import { Module } from '@nestjs/common';
import { ReportService } from './report.service.js';
import { ReportController } from './report.controller.js';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  providers: [ReportService],
  controllers: [ReportController],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/report',
      rootPath: join(import.meta.dirname, '../../src/public'),
    }),
  ],
})
export class ReportModule {}
