import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  gender!: string;

  @Column({ type: 'int' })
  age!: number;

  @Column({ type: 'float' })
  height!: number;

  @Column({ type: 'float' })
  initialWeight!: number;
}