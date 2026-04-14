import { IsString, IsNumber } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name!: string;

  @IsNumber()
  sets!: number;

  @IsNumber()
  reps!: number;

  @IsNumber()
  weight!: number;

  @IsNumber()
  restTime!: number;
}