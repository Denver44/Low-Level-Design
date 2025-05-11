// From Note 5: Booking class
import { Seat } from './seat';
import { Show } from './show';
import { BaseModel } from './baseModel';

interface Booking extends BaseModel {
  userId: string;
  show: Show;
  seats: Seat[];
  totalAmount: number;
  transactionId: string;
}

class BookingModel implements Booking {
  id: string;
  userId: string;
  show: Show;
  seats: Seat[];
  totalAmount: number;
  transactionId: string;
  constructor(
    id: string,
    userId: string,
    show: Show,
    seats: Seat[],
    totalAmount: number,
    transactionId: string
  ) {
    this.id = id;
    this.userId = userId;
    this.show = show;
    this.seats = seats;
    this.totalAmount = totalAmount;
    this.transactionId = transactionId;
  }
}

export { Booking, BookingModel };
