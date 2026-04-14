import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntry } from './entities/food.entity';
import { CreateFoodDto } from './dto/create-food.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodEntry)
    private readonly foodRepository: Repository<FoodEntry>,
  ) {}

  async create(dto: CreateFoodDto) {
    const food = this.foodRepository.create(dto);
    return await this.foodRepository.save(food);
  }

  async findByDate(date: string) {
    return await this.foodRepository.find({ where: { date } });
  }

  async remove(id: number) {
    return await this.foodRepository.delete(id);
  }

  //upd crud
  async findAll() {
    return await this.foodRepository.find();
  }

  async findOne(id: number) {
    return await this.foodRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFoodDto: any) {
    await this.foodRepository.update(id, updateFoodDto);
    return this.findOne(id);
  }
}