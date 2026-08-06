import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { models } from './models/index.js';
import {
  GoodsModelServices,
  UsersModelServices,
  TokensModelServices,
  ReportsModelServices,
  TaxParamsModelServices,
  ReportsTreeModelServices,
  ReportLoadingStatesModelServices,
  WeeklyPricesAndDiscountsModelServices,
} from './services/index.js';

@Global()
@Module({
  exports: [
    GoodsModelServices,
    UsersModelServices,
    TokensModelServices,
    ReportsModelServices,
    TaxParamsModelServices,
    ReportsTreeModelServices,
    ReportLoadingStatesModelServices,
    WeeklyPricesAndDiscountsModelServices,
    MongooseModule,
  ],
  providers: [
    GoodsModelServices,
    UsersModelServices,
    TokensModelServices,
    ReportsModelServices,
    TaxParamsModelServices,
    ReportsTreeModelServices,
    ReportLoadingStatesModelServices,
    WeeklyPricesAndDiscountsModelServices,
  ],
  imports: [MongooseModule.forFeature(models)],
})
export class DatabaseModule {}
