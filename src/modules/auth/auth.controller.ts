import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const existingUser = await this.userService.findOneByEmail(loginDto.email);

    if (!existingUser) {
      return loginDto;
    } else {
      const isPasswordMatch = await this.authService.comparePasswords(
        loginDto.password,
        existingUser.password,
      );

      if (isPasswordMatch) {
        return { token: this.authService.generateJwtToken(loginDto.email) };
      } else {
        return loginDto;
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('protected')
  getProtectedRoute() {
    return { message: 'This is a protected route!' };
  }
}
