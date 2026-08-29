import { Goods, GoodsSchema } from '../schemas/goods.schema.js';
import { Token, TokenSchema } from '../schemas/tokens.schema.js';
import { Users, UsersSchema } from '../schemas/users.schema.js';
import { Report, ReportSchema } from '../schemas/reports.schema.js';
import { TaxParams, TaxParamsSchema } from '../schemas/taxParams.schema.js';
import {
  ReportsWithAccountedFinances,
  ReportsWithAccountedFinancesSchema,
} from '../schemas/reportsWithAccountedFinances.schema.js';
import {
  ReportsTree,
  ReportsTreeSchema,
} from '../schemas/reportsTree.schema.js';
import {
  ReportLoadingStates,
  ReportLoadingStatesSchema,
} from '../schemas/reportLoadingState.schema.js';
import {
  WeeklyPricesAndDiscounts,
  WeeklyPricesAndDiscountsSchema,
} from '../schemas/weeklyPricesAndDiscounts.schema.js';

export var models = [
  { name: Users.name, schema: UsersSchema },
  { name: Goods.name, schema: GoodsSchema },
  { name: Token.name, schema: TokenSchema },
  { name: Report.name, schema: ReportSchema },
  { name: TaxParams.name, schema: TaxParamsSchema },
  { name: ReportsTree.name, schema: ReportsTreeSchema },
  { name: ReportLoadingStates.name, schema: ReportLoadingStatesSchema },
  {
    name: WeeklyPricesAndDiscounts.name,
    schema: WeeklyPricesAndDiscountsSchema,
  },
  {
    name: ReportsWithAccountedFinances.name,
    schema: ReportsWithAccountedFinancesSchema,
  },
];
