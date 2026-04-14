import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { Workout } from './entities/workout.entity';
import { ExerciseLog } from './entities/exercise-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, ExerciseLog])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService]
  })
export class WorkoutsModule {}