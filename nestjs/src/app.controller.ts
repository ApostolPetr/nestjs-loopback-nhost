import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { Req } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(200)
  @Get('/ping')
  getPing(@Req() req) {
    return this.appService.getPing(req);
  }
}
