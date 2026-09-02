import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import type { Response } from 'express';
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
        userId: newUser.id,
        email: newUser.email,
      });
      return response
        .status(201)
        .cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: false,
        })
        .cookie('accessToken', tokens.accessToken, {
          httpOnly: true,
          secure: false,
        })
        .json({
          ...newUser,
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
        userId: findUser.id,
        email: findUser.email,
      });
      return response
        .status(200)
        .cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: false,
        })
        .cookie('accessToken', tokens.accessToken, {
          httpOnly: true,
          secure: false,
        })
        .json({
          ...findUser,
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
}
