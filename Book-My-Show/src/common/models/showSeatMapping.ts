import { Entity, Column, ManyToOne } from 'typeorm';
import { SeatType } from './seatType';
import { Show } from './show';
import { SeatStatus } from './SeatStatus';
import { BaseEntity } from './baseEntity';

@Entity('show_seat_mappings')
export class ShowSeatMapping extends BaseEntity {
  @ManyToOne(() => Show)
  show!: Show;

  @ManyToOne(() => SeatType)
  seatType!: SeatType;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({
    type: 'enum',
    enum: SeatStatus,
    default: SeatStatus.AVAILABLE,
  })
  status!: SeatStatus;
}
