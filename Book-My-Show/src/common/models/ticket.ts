import { BaseModel } from './baseModel';
import { Payment } from './payment';
import { PaymentStatus } from './paymentStatus';
import { PaymentType } from './paymentType';
import { Seat } from './seat';
import { Show } from './show';
import { TicketStatus } from './ticketStatus';
import { User } from './user';

interface Ticket extends BaseModel {
  amount: number;
  bookingTime: Date;
  user: User;
  show: Show;
  seats: Seat[];
  payments: Payment[];
  status: TicketStatus;
}

class TicketModel implements Ticket {
  id: string;
  amount: number;
  bookingTime: Date;
  user: User;
  show: Show;
  seats: Seat[];
  payments: Payment[];
  status: TicketStatus;

  constructor(
    id: string,
    amount: number,
    user: User,
    show: Show,
    seats: Seat[]
  ) {
    this.id = id;
    this.amount = amount;
    this.bookingTime = new Date();
    this.user = user;
    this.show = show;
    this.seats = seats;
    this.payments = [];
    this.status = TicketStatus.PROCESSING; // Default to processing
  }

  // Method to add a payment
  addPayment(payment: Payment): void {
    this.payments.push(payment);

    // If all payments complete, update status
    if (this.getTotalPaidAmount() >= this.amount) {
      this.status = TicketStatus.BOOKED;
    }
  }

  // Calculate total paid amount
  getTotalPaidAmount(): number {
    return this.payments
      .filter(
        (p) => p.status === PaymentStatus.SUCCESS && p.type === PaymentType.PAY
      )
      .reduce((sum, p) => sum + p.amount, 0);
  }
}

export { Ticket, TicketModel };
