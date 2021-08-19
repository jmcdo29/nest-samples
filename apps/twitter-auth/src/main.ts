/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as exsession from 'express-session';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initialize, session } from 'passport';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  app.use(
    exsession({
      // TODO change this for production
      cookie: { secure: false },
      secret: 'YOUR_SECRET_MUST_CHANGE_THIS_OR_USE_CONFIG_SERIVCE',
      resave: true,
      saveUninitialized: true,
    }),
  );
  app.use(initialize());
  app.use(session());
  await app.listen(port);
  Logger.log(`Listening at ${await app.getUrl()}`);
}

bootstrap();
