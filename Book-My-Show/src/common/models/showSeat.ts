// In showSeat.ts
import { Entity, Column, ManyToOne, Index, Unique } from 'typeorm';
import { Seat } from './seat';
import { Show } from './show';
import { SeatStatus } from './SeatStatus';
import { BaseEntity } from './baseEntity';

@Entity('show_seats')
@Unique(['show', 'seat']) // Add unique constraint
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
}
