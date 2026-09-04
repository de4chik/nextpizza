import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '../utils/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException('User anuthorized');
    }

    const payload = this.jwtService.verifyToken(
      accessToken,
      process.env.SERVER_TOKEN_ACCESS_SECRET!,
    );
    if (!payload) {
      throw new UnauthorizedException('User anuthorized');
    }
    request.user = payload;
    return true;
  }
}
