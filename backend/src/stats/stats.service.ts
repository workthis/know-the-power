import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const allMetrics = await this.statsRepository.find();
    
    const getFormattedDate = (daysAgo: number) => {
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    const t0 = getFormattedDate(0);
    const t7 = getFormattedDate(7);
    const t30 = getFormattedDate(30);

    const getAvgWeight = (start: string, end: string) => {
      const period = allMetrics.filter(m => m.date >= start && m.date <= end && m.weight > 0);
      if (!period.length) return 0;
      return period.reduce((acc, curr) => acc + curr.weight, 0) / period.length;
    };

    const getWeightDiff = (start: string, end: string) => {
      const period = allMetrics
        .filter(m => m.date >= start && m.date <= end && m.weight > 0)
        .sort((a, b) => a.date.localeCompare(b.date));
      
      if (period.length < 2) return 0;
      return period[period.length - 1].weight - period[0].weight;
    };

    const curWeekAvg = getAvgWeight(t7, t0);
    const weightDiff = getWeightDiff(t7, t0);
    const monthlyWeightDiff = getWeightDiff(t30, t0);

    const manager = this.statsRepository.manager;
    let totalWorkouts = 0;
    let monthlyWorkouts = 0;
    let totalCalories = 0;

    const parseDate = (val: any) => {
      if (!val) return '1970-01-01';
      if (val instanceof Date) {
        const y = val.getFullYear();
        const m = String(val.getMonth() + 1).padStart(2, '0');
        const d = String(val.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
      }
      return String(val).substring(0, 10);
    };

    let wkData: any[] = [];
    try {
      wkData = await manager.getRepository('Workout').find();
    } catch (e) {
      try { wkData = await manager.query(`SELECT * FROM workouts`); } catch {}
    }

    let fdData: any[] = [];
    try {
      fdData = await manager.getRepository('FoodEntry').find();
    } catch (e) {
      try { fdData = await manager.query(`SELECT * FROM food_entries`); } catch {}
    }

    const curWkWorkouts = wkData.filter((w: any) => parseDate(w.date) >= t7 && parseDate(w.date) <= t0);
    const curMoWorkouts = wkData.filter((w: any) => parseDate(w.date) >= t30 && parseDate(w.date) <= t0);
    
    totalWorkouts = curWkWorkouts.length;
    monthlyWorkouts = curMoWorkouts.length;

    const curFd = fdData.filter((f: any) => parseDate(f.date) >= t7 && parseDate(f.date) <= t0);
    totalCalories = curFd.reduce((acc: number, f: any) => acc + Number(f.calories), 0);

    return {
      averageWeight: curWeekAvg ? Number(curWeekAvg.toFixed(1)) : 0,
      weightDiff: Number(weightDiff.toFixed(1)),
      totalWorkouts,
      totalCalories,
      monthlyWorkouts,
      monthlyWeightDiff: Number(monthlyWeightDiff.toFixed(1))
    };
  }

  async findByDate(date: string) {
    return await this.statsRepository.findOne({ where: { date } });
  }

  findAll() {
    return this.statsRepository.find();
  }

  async remove(id: number) {
    return await this.statsRepository.delete(id);
  }
}