import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Theater } from './theater';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // Note the '!' operator

  @Column()
  name!: string;

  @OneToMany(() => Theater, (theater) => theater.city)
  theaters!: Theater[];
}
