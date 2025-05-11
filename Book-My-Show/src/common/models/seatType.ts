import { Entity, Column } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('seat_types')
export class SeatType extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;
}
