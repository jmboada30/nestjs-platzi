import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appSvc: AppService) {}

  @Get()
  getHello(): string {
    return this.appSvc.getHello();
  }

  @Get('/ruta/')
  getText(): string {
    return 'Nest no le presta atencion a los / a menos que tengan parametros';
  }
}
