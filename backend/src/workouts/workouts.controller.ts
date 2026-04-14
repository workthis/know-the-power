import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

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

  //crud upd
  @Get()
  findAll() {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutsService.update(+id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(+id);
  }
}