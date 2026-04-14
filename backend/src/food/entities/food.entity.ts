import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('food_entries')
export class FoodEntry {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;

  @Column('float')
  calories!: number;

  @Column()
  amount!: string;

  @Column({ type: 'date' })
  date!: string;

  @CreateDateColumn()
  createdAt!: Date;
}