import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { User } from '../model/user.model';

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

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Role, {
    message: 'Role must be either ADMIN or USER',
  })
  readonly role: Role;
}
