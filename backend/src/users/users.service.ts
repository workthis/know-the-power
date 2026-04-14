import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
    
  async create(dto: CreateUserDto) {
    const newUser = this.usersRepository.create(dto);
    return await this.usersRepository.save(newUser);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }
}