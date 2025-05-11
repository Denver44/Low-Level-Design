import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Seat } from './seat';
import { Show } from './show';
import { SeatStatus } from './SeatStatus';

@Entity('show_seats')
export class ShowSeat {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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
