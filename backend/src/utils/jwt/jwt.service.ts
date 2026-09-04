import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService as JWTService, TokenExpiredError } from '@nestjs/jwt';
import { IUser } from '../../types/user.type';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: JWTService) {}

  generateToken(payload: Pick<IUser, 'id' | 'email'>): {
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

  verifyToken(token: string, secret: string): Pick<IUser, 'id' | 'email'> {
    try {
      const payload: Pick<IUser, 'id' | 'email'> = this.jwtService.verify(
        token,
        {
          secret: secret,
        },
      );

      return { id: payload.id, email: payload.email };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException(error.message);
      }
      throw new ForbiddenException('Invalid token');
    }
  }
}
