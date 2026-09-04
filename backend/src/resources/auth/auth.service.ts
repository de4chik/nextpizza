import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import type { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { JwtService } from '../../utils/jwt/jwt.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(response: Response, registerDto: RegisterDto) {
    try {
      const findUser = await this.userService.findByEmail(registerDto.email);
      if (findUser) {
        throw new ConflictException('User with this email already exists');
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(registerDto.password, salt);

      const newUser = await this.userService.create({
        ...registerDto,
        password: hashedPassword,
      });

      const tokens = this.jwtService.generateToken({
        id: newUser.id,
        email: newUser.email,
      });
      return response
        .status(201)
        .cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: false,
        })
        .json({
          ...newUser,
          accessToken: tokens.accessToken,
        });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }

      console.log(error);
      throw new InternalServerErrorException(
        'Internal server error. Please try again later.',
      );
    }
  }

  async login(response: Response, loginDto: LoginDto) {
    try {
      const findUser = await this.userService.findByEmail(loginDto.email);
      if (!findUser) {
        throw new ConflictException('Invalid email or password');
      }
      const verifyPassword = bcrypt.compareSync(
        loginDto.password,
        findUser.password,
      );
      if (!verifyPassword) {
        throw new ConflictException('Invalid email or password');
      }
      const tokens = this.jwtService.generateToken({
        id: findUser.id,
        email: findUser.email,
      });
      return response
        .status(200)
        .cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: false,
        })
        .json({
          ...findUser,
          accessToken: tokens.accessToken,
        });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }

      throw new InternalServerErrorException(
        'Internal server error. Please try again later.',
      );
    }
  }

  async refresh(request: Request, response: Response) {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    try {
      const payload = this.jwtService.verifyToken(
        refreshToken,
        process.env.SERVER_TOKEN_REFRESH_SECRET!,
      );
      const tokens = this.jwtService.generateToken({
        id: payload.id,
        email: payload.email,
      });
      return response
        .status(200)
        .cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: false,
        })
        .json({
          accessToken: tokens.accessToken,
        });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  logout(response: Response) {
    response.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
    });

    return response.status(200).json({
      message: 'Logged out successfully',
    });
  }

  getProfile(request: Request, response: Response) {
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return response.status(200).json(user);
  }
}
