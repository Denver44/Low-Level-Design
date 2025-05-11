// From Note 5: Booking class
import { Seat } from './seat';
import { Show } from './show';

interface Booking {
  bookingId: string;
  userId: string;
  show: Show;
  seats: Seat[];
  totalAmount: number;
  transactionId: string;
}

class BookingModel implements Booking {
  bookingId: string;
  userId: string;
  show: Show;
  seats: Seat[];
  totalAmount: number;
  transactionId: string;

  constructor(
    bookingId: string,
    userId: string,
    show: Show,
    seats: Seat[],
    totalAmount: number,
    transactionId: string
  ) {
    this.bookingId = bookingId;
    this.userId = userId;
    this.show = show;
    this.seats = seats;
    this.totalAmount = totalAmount;
    this.transactionId = transactionId;
  }
}

export { Booking, BookingModel };
