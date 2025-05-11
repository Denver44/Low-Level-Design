import { Entity, Column, OneToMany } from 'typeorm';
import { Theater } from './theater';
import { BaseEntity } from './baseEntity';

@Entity('cities')
export class City extends BaseEntity {
  @Column('varchar')
  name!: string;

  @OneToMany(() => Theater, (theater) => theater.city)
  theaters!: Theater[];
}
