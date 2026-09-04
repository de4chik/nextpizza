import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response, Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Res() response: Response, @Body() registerDto: RegisterDto) {
    return this.authService.register(response, registerDto);
  }

  @Post('login')
  login(@Res() response: Response, @Body() loginDto: LoginDto) {
    console.log(123);
    return this.authService.login(response, loginDto);
  }

  @Get('refresh')
  refresh(@Req() request: Request, @Res() response: Response) {
    return this.authService.refresh(request, response);
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  logout(@Res() response: Response) {
    return this.authService.logout(response);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() request: Request, @Res() response: Response) {
    return this.authService.getProfile(request, response);
  }
}
