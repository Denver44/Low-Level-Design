import { Entity, Column, ManyToOne } from 'typeorm';
import { Auditorium } from './auditorium';
import { SeatType } from './seatType';
import { BaseEntity } from './baseEntity';

@Entity('seats')
export class Seat extends BaseEntity {
  @Column()
  seatNumber!: string;

  @Column()
  row!: number;

  @Column()
  column!: number;

  @ManyToOne(() => SeatType)
  seatType!: SeatType;

  @ManyToOne(() => Auditorium, (auditorium) => auditorium.seats)
  auditorium!: Auditorium;
}
