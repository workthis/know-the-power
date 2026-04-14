import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Stat } from './entities/stat.entity';
import { CreateStatDto } from './dto/create-stat.dto';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stat)
    private statsRepository: Repository<Stat>,
  ) {}

  async updateMetrics(dto: CreateStatDto) {
    let metric = await this.statsRepository.findOne({ where: { date: dto.date } });

    if (metric) {
      metric.weight = dto.weight;
      metric.steps = dto.steps;
    } else {
      metric = this.statsRepository.create(dto);
    }

    return await this.statsRepository.save(metric);
  }

  async getWeeklyStats() {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    const lastWeekStr = d.toISOString().split('T')[0];

    const data = await this.statsRepository.find({
      where: { date: MoreThanOrEqual(lastWeekStr) },
      order: { date: 'ASC' }
    });

    if (data.length === 0) return { message: 'Даних за останні 7 днів немає' };

    const avgWeight = data.reduce((sum, item) => sum + item.weight, 0) / data.length;
    const totalSteps = data.reduce((sum, item) => sum + item.steps, 0);

    return {
      period: 'Останні 7 днів',
      averageWeight: avgWeight.toFixed(1),
      totalSteps: totalSteps,
      dailyDetails: data
      };
  }

  async findByDate(date: string) {
    return await this.statsRepository.findOne({ where: { date } });
  }

  //crud upd
  async findAll() {
    return await this.statsRepository.find({ order: { date: 'DESC' } });
  }

  async remove(id: number) {
    return await this.statsRepository.delete(id);
  }
}