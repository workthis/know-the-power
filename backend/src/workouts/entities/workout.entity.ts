import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ExerciseLog } from './exercise-log.entity';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column({ type: 'date' })
  date!: string;

  @OneToMany(() => ExerciseLog, (exercise) => exercise.workout, { cascade: true })
  exercises!: ExerciseLog[];

  @CreateDateColumn()
  createdAt!: Date;
}