import { Entity, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ticket } from './ticket';
import { PaymentType } from './PaymentType';
import { PaymentProvider } from './PaymentProvider';
import { PaymentStatus } from './PaymentStatus';
import { BaseEntity } from './baseEntity';

@Entity('payments')
export class Payment extends BaseEntity {
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
