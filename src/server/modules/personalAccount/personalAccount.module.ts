import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PersonalAccountService } from './personalAccount.service.js';
import { PersonalAccountController } from './personalAccount.controller.js';

@Module({
  providers: [PersonalAccountService],
  controllers: [PersonalAccountController],
  imports: [ConfigModule],
})
export class PersonalAccountModule {}
