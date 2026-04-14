import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Stat } from './entities/stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stat])],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService]
  })
export class StatsModule {}