import { join } from 'path';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configSerive: ConfigService) => ({
        global: true,
        signOptions: { expiresIn: '1day' },
        secret: configSerive.get<string>('SECRET_KEY'),
      }),
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/auth',
      rootPath: join(import.meta.dirname, '../../../src/client/html/auth/'),
    }),
  ],
})
export class AuthModule {}
