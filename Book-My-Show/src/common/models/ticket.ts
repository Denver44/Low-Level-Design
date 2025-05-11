import { Payment } from './payment';
import { Seat } from './seat';
import { Show } from './show';
import { User } from './user';

interface Ticket {
  ticketId: string;
  user: User;
  show: Show;
  seats: Seat[];
  payment: Payment;
}

class TicketModel implements Ticket {
  ticketId: string;
  user: User;
  show: Show;
  seats: Seat[];
  payment: Payment;

  constructor(
    ticketId: string,
    user: User,
    show: Show,
    seats: Seat[],
    payment: Payment
  ) {
    this.ticketId = ticketId;
    this.user = user;
    this.show = show;
    this.seats = seats;
    this.payment = payment;
  }
}

export { Ticket, TicketModel };
