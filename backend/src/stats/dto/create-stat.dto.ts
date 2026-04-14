import { IsNumber, IsString } from 'class-validator';

export class CreateStatDto {
  @IsNumber()
  weight!: number;

  @IsNumber()
  steps!: number;

  @IsString()
  date!: string;
}