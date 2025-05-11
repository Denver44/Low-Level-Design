import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { City } from './city';
import { Auditorium } from './auditorium';
import { BaseEntity } from './baseEntity';

@Entity('theaters')
export class Theater extends BaseEntity {
  @Column('varchar')
  name!: string;

  @Column('varchar')
  address!: string;

  @ManyToOne(() => City, (city) => city.theaters)
  city!: City;

  @OneToMany(() => Auditorium, (auditorium) => auditorium.theater)
  auditoriums!: Auditorium[];
}
