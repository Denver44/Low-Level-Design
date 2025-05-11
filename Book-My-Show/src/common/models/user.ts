import { Entity, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket';
import { BaseEntity } from './baseEntity';

@Entity('users')
export class User extends BaseEntity {
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
