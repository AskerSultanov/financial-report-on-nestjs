import { join } from 'path';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  providers: [AuthService], 
  controllers: [AuthController],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/auth',
      rootPath: join(import.meta.dirname, '../../src/public'),
    }),
  ],
})
export class AuthModule {}
