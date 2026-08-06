import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from './publicMetadata.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    var isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    var req = context.switchToHttp().getRequest();

    var token = req.cookies?.token;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      var secret = this.configService.get<string>('SECRET_KEY');
      var { payload } = await this.jwtService.verifyAsync(token, { secret });
      req.payload = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
