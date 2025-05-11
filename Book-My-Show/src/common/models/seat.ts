import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Auditorium } from './auditorium';
import { SeatType } from './seatType';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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
