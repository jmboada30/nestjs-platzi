import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // reflector permite ignorar los endpoint en especifico
    const ignore = this.reflector.get('isPublic', context.getHandler());
    if (ignore) return true;

    // Para obtener el request y evaluar lo que necesitemos
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.header('Auth');
    const isAuth = token === '1234';
    if (!isAuth) {
      throw new UnauthorizedException(
        'Mensaje Personalizado para los casos donde no exista autorizacion',
      );
    }
    return true;
  }
}
