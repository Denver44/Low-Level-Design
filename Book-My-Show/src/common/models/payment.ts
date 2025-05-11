import { PaymentStatus } from './paymentStatus';

interface Payment {
  paymentId: string;
  amount: number;
  paymentMethod: string;
  status: PaymentStatus;
}

class PaymentModel implements Payment {
  paymentId: string;
  amount: number;
  paymentMethod: string;
  status: PaymentStatus;

  constructor(paymentId: string, amount: number, paymentMethod: string) {
    this.paymentId = paymentId;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.status = PaymentStatus.PENDING; // Default status
  }
}

export { Payment, PaymentModel };
