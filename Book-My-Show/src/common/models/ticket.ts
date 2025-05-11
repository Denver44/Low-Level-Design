import { Payment } from './payment';
import { Seat } from './seat';
import { Show } from './show';
import { TicketStatus } from './ticketStatus';
import { User } from './user';
import { BaseModel } from './baseModel';

interface Ticket extends BaseModel {
  show: Show;
  user: User;
  seats: Seat[];
  amount: number;
  payments: Payment[]; // Changed from single payment to list
  bookingTime: Date;
  status: TicketStatus;
}

class TicketModel implements Ticket {
  id: string;
  show: Show;
  user: User;
  seats: Seat[];
  amount: number;
  payments: Payment[];
  bookingTime: Date;
  status: TicketStatus;
  constructor(
    id: string,
    show: Show,
    user: User,
    seats: Seat[],
    amount: number
  ) {
    this.id = id;
    this.show = show;
    this.user = user;
    this.seats = seats;
    this.amount = amount;
    this.payments = []; // Initialize empty payments list
    this.bookingTime = new Date();
    this.status = TicketStatus.BOOKED;
  }

  // Method to add a payment
  addPayment(payment: Payment): void {
    this.payments.push(payment);
  }
}

export { Ticket, TicketModel };
