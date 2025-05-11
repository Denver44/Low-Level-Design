// src/models/showSeat.ts
import { Entity, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Seat } from './seat';
import { Show } from './show';
import { SeatStatus } from './SeatStatus';
import { BaseEntity } from './baseEntity';

@Entity('show_seats')
export class ShowSeat extends BaseEntity {
  @ManyToOne(() => Show, (show) => show.showSeats)
  show!: Show;

  @ManyToOne(() => Seat)
  seat!: Seat;

  @Column({
    type: 'enum',
    enum: SeatStatus,
    default: SeatStatus.AVAILABLE,
  })
  status!: SeatStatus;

  @Column({ nullable: true, type: 'datetime' })
  lockedAt?: Date; // Added timestamp for when the seat was locked
}
