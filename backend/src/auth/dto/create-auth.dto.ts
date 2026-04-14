import { IsEmail, IsString, MinLength, IsNumber } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: 'Невірний формат пошти' })
  email!: string;

  @IsString()
  @MinLength(12, { message: 'Пароль має містити мінімум 12 символів' })
  password!: string;

  @IsString()
  gender!: string;

  @IsNumber({}, { message: 'Вік має бути вказаний числом' })
  age!: number;

  @IsNumber({}, { message: 'Зріст має бути вказаний числом' })
  height!: number;

  @IsNumber({}, { message: 'Вага має бути вказана числом' })
  initialWeight!: number;
}