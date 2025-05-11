import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('seat_types')
export class SeatType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;
}
