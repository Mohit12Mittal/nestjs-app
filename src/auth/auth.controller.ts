import { Body, Controller, Get, Post } from '@nestjs/common';
import { loginUserDto, regisetrUserDTO } from './dto/auth.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  registerUser(@Body() regisetrUserDTO: regisetrUserDTO) {
    const result = this.authService.registerUserService(regisetrUserDTO);
    return result;
  }
  @Get('login')
  loginUser(@Body() loginUserDTO: loginUserDto) {
    const result = this.authService.loginUser(loginUserDTO);
    return result;
  }
}
