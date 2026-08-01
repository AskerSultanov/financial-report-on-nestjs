import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VerifyAuthentication } from './verifyAuthentication.js';

@Module({ providers: [VerifyAuthentication], imports: [ConfigService] })
export class MiddlewareModule {}
