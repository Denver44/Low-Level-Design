import { PaymentStatus } from './paymentStatus';
import { PaymentType } from './paymentType';

interface Payment {
  paymentId: string;
  amount: number;
  type: PaymentType; // Added type (PAY or REFUND)
  paymentMethod: string;
  provider: string;
  transactionTime: Date;
  referenceId: string;
  status: PaymentStatus;
}

class PaymentModel implements Payment {
  paymentId: string;
  amount: number;
  type: PaymentType;
  paymentMethod: string;
  provider: string;
  transactionTime: Date;
  referenceId: string;
  status: PaymentStatus;

  constructor(
    paymentId: string,
    amount: number,
    type: PaymentType,
    paymentMethod: string,
    provider: string,
    referenceId: string
  ) {
    this.paymentId = paymentId;
    this.amount = amount;
    this.type = type;
    this.paymentMethod = paymentMethod;
    this.provider = provider;
    this.transactionTime = new Date();
    this.referenceId = referenceId;
    this.status = PaymentStatus.PENDING;
  }
}

export { Payment, PaymentModel };
