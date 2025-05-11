import { BaseModel } from './baseModel';
import { PaymentProvider } from './paymentProvider';
import { PaymentStatus } from './paymentStatus';
import { PaymentType } from './paymentType';
import { Ticket } from './ticket'; // Added for ticket reference

interface Payment extends BaseModel {
  amount: number;
  type: PaymentType;
  provider: PaymentProvider; // Changed to use enum
  transactionTime: Date;
  referenceId: string;
  status: PaymentStatus;
  ticket?: Ticket; // Added ticket reference
}

class PaymentModel implements Payment {
  id: string;
  amount: number;
  type: PaymentType;
  provider: PaymentProvider;
  transactionTime: Date;
  referenceId: string;
  status: PaymentStatus;
  ticket?: Ticket;

  constructor(
    id: string,
    amount: number,
    type: PaymentType,
    provider: PaymentProvider,
    referenceId: string,
    ticket?: Ticket
  ) {
    this.id = id;
    this.amount = amount;
    this.type = type;
    this.provider = provider;
    this.transactionTime = new Date();
    this.referenceId = referenceId;
    this.status = PaymentStatus.PENDING;
    this.ticket = ticket;
  }
}

export { Payment, PaymentModel };
