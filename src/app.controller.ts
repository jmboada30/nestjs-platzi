import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';

import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { AppService } from './app.service';

// @UseGuards me activa el guardian a nivel de controlador
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @SetMetadata me permite liberar un endpoint en especifico del guardian
  // para que funcione hay que usar reflector en el guardian
  @SetMetadata('isPublic', true)
  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }
}
