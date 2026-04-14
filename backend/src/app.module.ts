import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { FoodModule } from './food/food.module';
import { StatsModule } from './stats/stats.module';
import { JournalModule } from './journal/journal.module';

@Module({
  imports: [
    // Налаштування бази даних sqlite у локальному файлі
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // автоматична назва
      autoLoadEntities: true, // автоматично додаємо entity ts
      synchronize: true, // автоматично створюємо таблиці в бд
      }),

      // реєструємо модулі
    UsersModule,
    AuthModule,
    WorkoutsModule,
    FoodModule,
    StatsModule,
    JournalModule,
  ],
  controllers: [],
  providers: [],
  })
  export class AppModule {}