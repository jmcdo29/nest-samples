import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CookieSerializer } from './passport/passport-serializer';
import { TwitterStrategy } from './passport/twitter/twitter.strategy';

@Module({
  imports: [CookieSerializer], // Must include cookie serializer
  controllers: [AppController, TwitterStrategy], // Must include twitter strategy
  providers: [AppService],
})
export class AppModule {}
