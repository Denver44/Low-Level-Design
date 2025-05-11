import { Entity, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket';
import { BaseEntity } from './baseEntity';

@Entity('users')
export class User extends BaseEntity {
  @Column('varchar')
  name!: string;

  @Column('int')
  age!: number;

  @Column('varchar', { unique: true })
  email!: string;

  @Column('varchar')
  password!: string; // In production, this should be hashed

  @Column('varchar')
  phoneNumber!: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets!: Ticket[];
}
