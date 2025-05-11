import { Payment } from './payment';
import { Seat } from './seat';
import { Show } from './show';
import { TicketStatus } from './ticketStatus';
import { User } from './user';

interface Ticket {
  ticketId: string;
  show: Show;
  user: User;
  seats: Seat[];
  amount: number;
  payment: Payment;
  bookingTime: Date; // Added booking time
  status: TicketStatus; // Added ticket status
}

class TicketModel implements Ticket {
  ticketId: string;
  show: Show;
  user: User;
  seats: Seat[];
  amount: number;
  payment: Payment;
  bookingTime: Date;
  status: TicketStatus;

  constructor(
    ticketId: string,
    show: Show,
    user: User,
    seats: Seat[],
    amount: number,
    payment: Payment
  ) {
    this.ticketId = ticketId;
    this.show = show;
    this.user = user;
    this.seats = seats;
    this.amount = amount;
    this.payment = payment;
    this.bookingTime = new Date(); // Set to current time
    this.status = TicketStatus.BOOKED; // Default status
  }
}

export { Ticket, TicketModel };
