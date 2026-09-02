import { Injectable } from '@nestjs/common';
import { JwtService as JWTService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: JWTService) {}

  generateToken(payload: object): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.SERVER_TOKEN_ACCESS_SECRET,
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.SERVER_TOKEN_REFRESH_SECRET,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  verifyToken(token: string): { email: string; userId: string } {
    return this.jwtService.verify(token, {
      secret: process.env.SERVER_TOKEN_ACCESS_SECRET,
    }) as { email: string; userId: string };
  }
}
