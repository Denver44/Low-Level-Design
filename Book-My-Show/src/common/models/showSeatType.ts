import { Entity, Column, ManyToOne } from 'typeorm';
import { SeatType } from './seatType';
import { Show } from './show';
import { BaseEntity } from './baseEntity';

@Entity('show_seat_types')
export class ShowSeatType extends BaseEntity {
  @ManyToOne(() => Show, (show) => show.showSeatTypes)
  show!: Show;

  @ManyToOne(() => SeatType)
  seatType!: SeatType;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;
}
