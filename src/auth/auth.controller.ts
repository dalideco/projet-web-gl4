import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'decorators/public.decorator';
import { Roles } from 'decorators/roles.decoroator';
import Role from 'models/role.enum';
import { AuthService } from './auth.service';
import { SingupUserDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() body: SingupUserDto) {
    const emailExists = await this.authService.verifyEmailExists(body.email)
    if(emailExists) throw new HttpException('Email already exits', HttpStatus.CONFLICT)
    return this.authService.singupUser(body.email, body.password);
  }

  @Roles(Role.user)
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }

  @Roles(Role.admin)
  @Post("admin-profile")
  async adminProfile(@Request() req) {
    return req.user
  }
}
