import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SeatType } from './seatType';
import { Show } from './show';

@Entity('show_seat_types')
export class ShowSeatType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Show, (show) => show.showSeatTypes)
  show!: Show;

  @ManyToOne(() => SeatType)
  seatType!: SeatType;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;
}
