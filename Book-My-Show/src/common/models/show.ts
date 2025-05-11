import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Auditorium } from './auditorium';
import { Movie } from './movie';
import { ShowSeat } from './showSeat';
import { ShowSeatType } from './showSeatType';

@Entity('shows')
export class Show {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Movie)
  movie!: Movie;

  @Column()
  startTime!: Date;

  @Column()
  endTime!: Date;

  @Column()
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
