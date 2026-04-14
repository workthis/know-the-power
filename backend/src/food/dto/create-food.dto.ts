import { IsString, IsNumber } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  name!: string;

  @IsNumber()
  calories!: number;

  @IsString()
  amount!: string;

  @IsString()
  date!: string;
}