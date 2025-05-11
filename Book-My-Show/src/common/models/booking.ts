import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Seat } from './seat';
import { Show } from './show';
import { User } from './user';
import { BaseEntity } from './baseEntity';

@Entity('bookings')
export class Booking extends BaseEntity {
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
