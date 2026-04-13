import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';





@Injectable()
export class UsersService {


  private lastRequestLog = new Map<string, string>(); // тимчасове сховище сессії

  logRequest(ip: string) {
    this.lastRequestLog.set(ip, new Date().toISOString());
    return { message: 'Записано в Map', currentLogSize: this.lastRequestLog.size };
  }
  getMemoryLogs() {
    return Object.fromEntries(this.lastRequestLog);
  }


  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // підключаємо керування таблицею користувачів
  ) {}

  // Створення нового користувача
  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto as any;
    const newUser = this.usersRepository.create({
      ...userData,
      passwordHash: password, // записуємо отриманий пароль у колонку passwordHash
    });
    return await this.usersRepository.save(newUser);
  }

  // отримання всіх користувачів
  findAll() {
    return this.usersRepository.find();
  }

  // пошук користувача за ID
  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  // Оновлення даних зміна ваги або росту
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...userData } = updateUserDto as any;
    const dataToUpdate: any = { ...userData };
    
    if (password) {
      dataToUpdate.passwordHash = password;
    }

    await this.usersRepository.update(id, dataToUpdate);
    return this.findOne(id); // повертаємо оновленого користувача
  }

  // видалення користувача
  async remove(id: number) {
    await this.usersRepository.delete(id);
    return { deleted: true };
  }
}