import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
  })
  @Post('create')
  async create(@Body() userDto: UserDto): Promise<UserDto> {
    const hashedPassword = await this.authService.hashPassword(
      userDto.password,
    );
    const newUserDto = { ...userDto, password: hashedPassword };
    return await this.userService.create(newUserDto);
  }
}
