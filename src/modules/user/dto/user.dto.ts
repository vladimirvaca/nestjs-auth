import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { User } from '../model/user.model';
import { ApiProperty } from '@nestjs/swagger';

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserDto {
  constructor(user: User) {
    this.name = user.name;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role as Role;
  }

  @ApiProperty({ example: 'Tony' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Stark' })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: 'tonystark91@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'secretpassword' })
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ example: Role.USER, enum: Role })
  @IsNotEmpty()
  @IsEnum(Role, {
    message: 'Role must be either ADMIN or USER',
  })
  readonly role: Role;
}
