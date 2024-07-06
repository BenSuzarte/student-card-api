import { AuthService } from './auth.service';
import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';

@Controller('auth')
export class AuthController { 
  constructor( private readonly authService: AuthService ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user)
  }
}
