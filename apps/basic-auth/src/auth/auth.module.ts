import { Module } from '@nestjs/common';
import { BasicStrategy } from './basic.strategy';

@Module({
  providers: [BasicStrategy],
})
export class AuthModule { }
