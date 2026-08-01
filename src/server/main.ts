import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

var bootstrap = async () => {
  var app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      timestamp: false,
      logLevels: ['error', 'fatal', 'warn'],
    }),
  });

  var conf = app.get(ConfigService);
  var port = conf.get('PORT');
  var host = conf.get('HOST');

  app.use(cookieParser());

  await app.listen(port, host, () =>
    console.log('---------- SERVER RUN ----------'),
  );
};
bootstrap();
