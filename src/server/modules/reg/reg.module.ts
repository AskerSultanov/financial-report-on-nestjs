import { join } from 'path';
import { Module } from '@nestjs/common';
import { RegistrationServices } from './req.service.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RegistrationController } from './reg.controller.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [RegistrationServices],
  controllers: [RegistrationController],
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      serveRoot: '/reg',
      rootPath: join(import.meta.dirname, '../../../src/client/html/registration/'),
    }),
  ],
})
export class RegistrationModule {}
