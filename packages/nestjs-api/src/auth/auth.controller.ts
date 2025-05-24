import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    type: LoginDto,
    description: 'Login a user',
    examples: {
      'Login': {
        value: {
          email: 'test@test.com',
          password: 'password',
        }
      }
    }
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @ApiBody({
    type: RegisterDto,
    description: 'Register a new user',
    examples: {
      'Register': {
        value: {
          email: 'test@test.com',
          password: 'password',
          name: 'John Doe'
        }
      }
    }
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
} 