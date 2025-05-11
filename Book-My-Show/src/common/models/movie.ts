import { Entity, Column } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('movies')
export class Movie extends BaseEntity {
  @Column('varchar')
  title!: string;

  @Column('simple-array')
  languages!: string[];

  @Column('int')
  duration!: number;

  @Column('varchar')
  genre!: string;

  @Column('varchar')
  rating!: string;

  @Column('simple-array')
  features!: string[];

  @Column('simple-array', { nullable: true })
  cast?: string[];
  @Column('date')
  releaseDate!: Date;

  @Column('date')
  endDate!: Date;

  @Column('varchar')
  language!: string; // Default language for backward compatibility
}
