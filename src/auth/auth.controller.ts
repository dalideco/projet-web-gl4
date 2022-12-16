import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() body) {
    console.log(body);
    return this.authService.singupUser(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async profile(@Request() req) {
    return req.user;
  }
}
