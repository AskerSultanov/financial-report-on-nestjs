import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './modules/app.module.js';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptionFilter/http-exception.filter.js';

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
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port, host, () =>
    console.log('---------- SERVER RUN ----------'),
  );
};
bootstrap();
