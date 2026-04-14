import { Injectable } from '@nestjs/common';
import { FoodService } from '../food/food.service';
import { WorkoutsService } from '../workouts/workouts.service';
import { StatsService } from '../stats/stats.service';

@Injectable()
export class JournalService {
  constructor(
    private foodService: FoodService,
    private workoutsService: WorkoutsService,
    private statsService: StatsService,
  ) {}

  async getDailyJournal(date: string) {
    const [food, workouts, metrics] = await Promise.all([
      this.foodService.findByDate(date),
      this.workoutsService.findByDate(date),
      this.statsService.findByDate(date),
    ]);
    return {
      date,
      metrics: metrics || { weight: null, steps: 0 },
      food: food || [],
      workouts: workouts || [],
    };
  }
}