import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('protected')
  @UseGuards(AuthGuard('basic'))
  gewtProtected() {
    return { authenticated: true };
  }
}
