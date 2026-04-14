import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  createWorkout(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.createWorkout(createWorkoutDto);
  }

  @Post(':id/exercise')
  addExercise(@Param('id') id: string, @Body() createExerciseDto: CreateExerciseDto) {
    return this.workoutsService.addExercise(+id, createExerciseDto);
  }

  @Get('date/:date')
  findByDate(@Param('date') date: string) {
    return this.workoutsService.findByDate(date);
  }
}