import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { FoodModule } from '../food/food.module';
import { WorkoutsModule } from '../workouts/workouts.module';
import { StatsModule } from '../stats/stats.module';

@Module({
  imports: [FoodModule, WorkoutsModule, StatsModule],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}