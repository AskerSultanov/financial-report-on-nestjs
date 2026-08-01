import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IndexModule } from './modules/index/index.module.js';
import { IndexController } from './modules/index/index.controller.js';
import { ReportModule } from './modules/reports/report.module.js';
import { ReportController } from './modules/reports/report.controller.js';
import { WBTokenModule } from './modules/wbToken/token.module.js';
import { WBTokenController } from './modules/wbToken/token.controller.js';
import { AuthController } from './modules/auth/auth.controller.js';
import { AuthModule } from './modules/auth/auth.module.js';

@Module({
  providers: [IndexModule, ReportModule, WBTokenModule],
  controllers: [IndexController, ReportController, WBTokenController],
  imports: [
    AuthModule,
    IndexModule,
    ReportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../..env',
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
