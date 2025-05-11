import { Entity, Column } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('seat_types')
export class SeatType extends BaseEntity {
  @Column('varchar')
  name!: string;

  @Column('varchar', { nullable: true })
  description?: string;
}
