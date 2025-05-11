import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Payment } from './payment';
import { Seat } from './seat';
import { Show } from './show';
import { User } from './user';
import { TicketStatus } from './ticketStatus';
import { BaseEntity } from './baseEntity';

@Entity('tickets')
export class Ticket extends BaseEntity {
  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @CreateDateColumn()
  bookingTime!: Date;

  @ManyToOne(() => User, (user) => user.tickets)
  user!: User;

  @ManyToOne(() => Show)
  show!: Show;

  @ManyToMany(() => Seat)
  @JoinTable()
  seats!: Seat[];

  @OneToMany(() => Payment, (payment) => payment.ticket)
  payments!: Payment[];

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.PROCESSING,
  })
  status!: TicketStatus;
}
