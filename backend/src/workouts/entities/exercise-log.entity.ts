import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Workout } from './workout.entity';

@Entity('exercise_logs')
export class ExerciseLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('int')
  sets!: number;

  @Column('int')
  reps!: number;

  @Column('float')
  weight!: number;

  @Column('int')
  restTime!: number;

  @ManyToOne(() => Workout, (workout) => workout.exercises, { onDelete: 'CASCADE' })
  workout!: Workout;
}