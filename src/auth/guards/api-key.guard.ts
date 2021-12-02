import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';
import { Observable } from 'rxjs';

import config from 'src/config';

import { IS_PUBLIC_KEY } from './../decorators/is-public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configSrv: ConfigType<typeof config>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // reflector permite ignorar los endpoint en especifico
    const ignore = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (ignore) return true;

    // Para obtener el request y evaluar lo que necesitemos
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.header('Auth');
    const isAuth = token === this.configSrv.apiKey;
    if (!isAuth) {
      throw new UnauthorizedException(
        'Mensaje Personalizado para los casos donde no exista autorizacion',
      );
    }
    return true;
  }
}
