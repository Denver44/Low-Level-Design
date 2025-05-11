import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Feature } from './feature';
import { Seat } from './seat';
import { Show } from './show';
import { Theater } from './theater';

@Entity('auditoriums')
export class Auditorium {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Theater, (theater) => theater.auditoriums)
  theater!: Theater;

  @OneToMany(() => Seat, (seat) => seat.auditorium)
  seats!: Seat[];

  @OneToMany(() => Show, (show) => show.auditorium)
  shows!: Show[];

  @ManyToMany(() => Feature)
  @JoinTable()
  features!: Feature[];
}
