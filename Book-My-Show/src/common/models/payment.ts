import { PaymentStatus } from './paymentStatus';
import { PaymentType } from './paymentType';
import { BaseModel } from './baseModel';

interface Payment extends BaseModel {
  amount: number;
  type: PaymentType; // Added type (PAY or REFUND)
  paymentMethod: string;
  provider: string;
  transactionTime: Date;
  referenceId: string;
  status: PaymentStatus;
}

class PaymentModel implements Payment {
  id: string;
  amount: number;
  type: PaymentType;
  paymentMethod: string;
  provider: string;
  transactionTime: Date;
  referenceId: string;
  status: PaymentStatus;
  constructor(
    id: string,
    amount: number,
    type: PaymentType,
    paymentMethod: string,
    provider: string,
    referenceId: string
  ) {
    this.id = id;
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
