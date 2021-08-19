import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CookieSerializer } from './passport/passport-serializer';
import { TwitterStrategy } from './passport/twitter/twitter.strategy';

@Module({
  imports: [],
  // You MUST include cookie serializer, and TwitterStrategy
  controllers: [AppController, TwitterStrategy, CookieSerializer],
  providers: [AppService],
})
export class AppModule {}
