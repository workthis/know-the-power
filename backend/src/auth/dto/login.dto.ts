import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Невірний формат пошти' })
  email!: string;

  @IsString()
  @MinLength(12, { message: 'Пароль має містити мінімум 12 символів' })
  password!: string;
}