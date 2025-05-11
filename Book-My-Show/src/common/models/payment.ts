import { PaymentStatus } from './paymentStatus';

interface Payment {
  paymentId: string;
  amount: number;
  paymentMethod: string;
  provider: string; // Added provider
  transactionTime: Date; // Added transaction time
  referenceId: string; // Added reference ID
  status: PaymentStatus;
}

class PaymentModel implements Payment {
  paymentId: string;
  amount: number;
  paymentMethod: string;
  provider: string;
  transactionTime: Date;
  referenceId: string;
  status: PaymentStatus;

  constructor(
    paymentId: string,
    amount: number,
    paymentMethod: string,
    provider: string,
    referenceId: string
  ) {
    this.paymentId = paymentId;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.provider = provider;
    this.transactionTime = new Date(); // Set to current time
    this.referenceId = referenceId;
    this.status = PaymentStatus.PENDING; // Default status
  }
}

export { Payment, PaymentModel };
