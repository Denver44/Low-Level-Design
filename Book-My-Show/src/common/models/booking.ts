import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Seat } from './seat';
import { Show } from './show';
import { User } from './user';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Show)
  show!: Show;

  @ManyToMany(() => Seat)
  @JoinTable()
  seats!: Seat[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount!: number;

  @Column()
  transactionId!: string;
}
