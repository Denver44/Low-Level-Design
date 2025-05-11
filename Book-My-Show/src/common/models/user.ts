import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  age!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string; // In production, this should be hashed

  @Column()
  phoneNumber!: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets!: Ticket[];
}
