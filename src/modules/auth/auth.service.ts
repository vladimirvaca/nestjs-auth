import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = 10;
      return await bcrypt.hash(password, salt);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      throw new Error(`Error hashing password: ${errorMessage}`);
    }
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  generateJwtToken(email: string): string {
    const payload = { email };
    return this.jwtService.sign(payload);
  }
}
