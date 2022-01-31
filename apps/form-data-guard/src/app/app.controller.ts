import { UseGuards } from '@nestjs/common';
import { Controller, Get, Body, Post, UploadedFile } from '@nestjs/common';

import { AppService } from './app.service';
import { FormGuard } from './form.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(FormGuard)
  @Post('form-data')
  helloForms(@Body() body, @UploadedFile() file) {
    console.log({ body, file });
    return this.appService.getData();
  }
}
