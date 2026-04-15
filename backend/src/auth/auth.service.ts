import { ConflictException, BadRequestException } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';






//      Аунтенфікація, немає обробки 500
/* @Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto) {
    return await this.usersService.create(dto);
  }

  async login(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Невірний логін або пароль');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        gender: user.gender,
        age: user.age,
        height: user.height,
        initialWeight: user.initialWeight
      }
    };
  }
} */



  @Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto) {
    const existingUser = await this.usersService.findOneByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Користувач із такою поштою вже існує');
    }

    return await this.usersService.create(dto);
  }

  async login(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Невірний логін або пароль');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        gender: user.gender,
        age: user.age,
        height: user.height,
        initialWeight: user.initialWeight
      }
    };
  }
}