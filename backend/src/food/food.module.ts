import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { FoodEntry } from './entities/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntry])],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService]
  })
export class FoodModule {}