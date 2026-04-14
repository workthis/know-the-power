import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { ExerciseLog } from './entities/exercise-log.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
    @InjectRepository(ExerciseLog)
    private exerciseRepository: Repository<ExerciseLog>,
  ) {}

  async createWorkout(dto: CreateWorkoutDto) {
    const workout = this.workoutRepository.create(dto);
    return await this.workoutRepository.save(workout);
  }

  async addExercise(workoutId: number, dto: CreateExerciseDto) {
    const workout = await this.workoutRepository.findOne({ where: { id: workoutId } });
    if (!workout) {
      throw new NotFoundException('Тренування не знайдено');
    }

    const exercise = this.exerciseRepository.create({ ...dto, workout });
    return await this.exerciseRepository.save(exercise);
  }

  async findByDate(date: string) {
    return await this.workoutRepository.find({
      where: { date },
      relations: ['exercises'],
      });
  }
}