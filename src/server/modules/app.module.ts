import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';

import { AuthModule } from './auth/auth.module.js';
import { IndexModule } from './index/index.module.js';
import { WBTokenModule } from './wbToken/token.module.js';
import { RegistrationModule } from './reg/reg.module.js';
import { ReportModule } from './reports/report.module.js';
import { DatabaseModule } from '../database/database.module.js';
import { PersonalAccountModule } from './personalAccount/personalAccount.module.js';
import { DecodeReportWithoutRegistrationModule } from './decodeReportWithoutRegistration/decodeReportWithoutRegistration.module.js';

@Module({
  providers: [],
  controllers: [],
  imports: [
    AuthModule,
    IndexModule,
    ReportModule,
    WBTokenModule,
    DatabaseModule,
    RegistrationModule,
    PersonalAccountModule,
    DecodeReportWithoutRegistrationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../..env',
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .exclude(
        { path: '/reg/*splat', method: RequestMethod.ALL },
        { path: '/auth/*splat', method: RequestMethod.ALL },
        { path: '/background-tasks/*splat', method: RequestMethod.ALL },
        {
          path: '/decode-report-without-registration/*splat',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes('*');
  }
}
