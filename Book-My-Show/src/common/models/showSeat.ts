import { Seat } from './seat';
import { Show } from './show';

enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  LOCKED = 'LOCKED',
}

interface ShowSeat {
  id: string;
  show: Show;
  seat: Seat;
  status: SeatStatus;
}

class ShowSeatModel implements ShowSeat {
  id: string;
  show: Show;
  seat: Seat;
  status: SeatStatus;

  constructor(id: string, show: Show, seat: Seat) {
    this.id = id;
    this.show = show;
    this.seat = seat;
    this.status = SeatStatus.AVAILABLE; // Default status
  }
}

export { SeatStatus, ShowSeat, ShowSeatModel };
