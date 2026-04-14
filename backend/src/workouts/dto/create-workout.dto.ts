import { IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  name!: string;

  @IsString()
  type!: string;

  @IsString()
  date!: string;
}