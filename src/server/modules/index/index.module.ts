import { join } from 'path';
import { Module } from '@nestjs/common';
import { IndexService } from './index.service.js';
import { IndexController } from './index.controller.js';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  providers: [IndexService],
  controllers: [IndexController],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(import.meta.dirname, '../../../src/client/'),
    }),
  ],
})
export class IndexModule {}
