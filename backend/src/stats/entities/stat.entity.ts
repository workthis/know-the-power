import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('daily_metrics')
export class Stat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  weight!: number;

  @Column({ default: 0 })
  steps!: number;

  @Column({ type: 'date', unique: true })
  date!: string; 

  @CreateDateColumn()
  createdAt!: Date;
}