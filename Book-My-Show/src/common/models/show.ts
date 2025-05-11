import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Auditorium } from './auditorium';
import { Movie } from './movie';
import { ShowSeat } from './showSeat';
import { ShowSeatType } from './showSeatType';
import { BaseEntity } from './baseEntity';

@Entity('shows')
export class Show extends BaseEntity {
  @ManyToOne(() => Movie)
  movie!: Movie;

  @Column('timestamp')
  startTime!: Date;

  @Column('timestamp')
  endTime!: Date;

  @Column('varchar')
  language!: string;

  @Column('simple-array')
  features!: string[];

  @ManyToOne(() => Auditorium, (auditorium) => auditorium.shows)
  auditorium!: Auditorium;

  @OneToMany(() => ShowSeatType, (showSeatType) => showSeatType.show)
  showSeatTypes!: ShowSeatType[];

  @OneToMany(() => ShowSeat, (showSeat) => showSeat.show)
  showSeats!: ShowSeat[];
}
