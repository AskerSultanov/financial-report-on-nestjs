import { join } from 'path';
import { Module } from '@nestjs/common';
import { WBTokenController } from './token.controller.js';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  controllers: [WBTokenController],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/report',
      rootPath: join(import.meta.dirname, '../../src/public'),
    }),
  ],
})
export class WBTokenModule {}
