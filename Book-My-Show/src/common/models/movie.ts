import { Entity, Column } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('movies')
export class Movie extends BaseEntity {
  @Column()
  title!: string;

  @Column('simple-array')
  languages!: string[];

  @Column()
  duration!: number;

  @Column()
  genre!: string;

  @Column()
  rating!: string;

  @Column('simple-array')
  features!: string[];

  @Column('simple-array', { nullable: true })
  cast?: string[];

  @Column()
  releaseDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  language!: string; // Default language for backward compatibility
}
