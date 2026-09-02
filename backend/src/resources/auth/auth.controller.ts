import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response, Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Res() response: Response, @Body() registerDto: RegisterDto) {
    return this.authService.register(response, registerDto);
  }

  @Post('login')
  login(@Res() response: Response, @Body() loginDto: LoginDto) {
    return this.authService.login(response, loginDto);
  }

  @Get('refresh')
  refresh(@Req() request: Request, @Res() response: Response) {
    return this.authService.refresh(request, response)
  }
}
