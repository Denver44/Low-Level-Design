import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Ticket } from './ticket';
import { PaymentType } from './paymentType';
import { PaymentProvider } from './paymentProvider';
import { PaymentStatus } from './paymentStatus';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column({
    type: 'enum',
    enum: PaymentType,
  })
  type!: PaymentType;

  @Column({
    type: 'enum',
    enum: PaymentProvider,
  })
  provider!: PaymentProvider;

  @CreateDateColumn()
  transactionTime!: Date;

  @Column()
  referenceId!: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @ManyToOne(() => Ticket, (ticket) => ticket.payments)
  ticket?: Ticket;
}
