import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { City } from './city';
import { Auditorium } from './auditorium';

@Entity('theaters')
export class Theater {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @ManyToOne(() => City, (city) => city.theaters)
  city!: City;

  @OneToMany(() => Auditorium, (auditorium) => auditorium.theater)
  auditoriums!: Auditorium[];
}
