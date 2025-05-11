import { Entity, Column, ManyToOne } from 'typeorm';
import { Auditorium } from './auditorium';
import { SeatType } from './seatType';
import { BaseEntity } from './baseEntity';

@Entity('seats')
export class Seat extends BaseEntity {
  @Column('varchar')
  seatNumber!: string;

  @Column('int')
  row!: number;

  @Column('int')
  column!: number;

  @ManyToOne(() => SeatType)
  seatType!: SeatType;

  @ManyToOne(() => Auditorium, (auditorium) => auditorium.seats)
  auditorium!: Auditorium;
}
