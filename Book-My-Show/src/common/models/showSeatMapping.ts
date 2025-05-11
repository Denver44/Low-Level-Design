import { SeatType } from './seatType';
import { Show } from './show';

// Use the existing SeatStatus enum from seat.ts or create a new one
enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  LOCKED = 'LOCKED',
}

interface ShowSeatMapping {
  mappingId: string;
  show: Show;
  seatType: SeatType;
  price: number;
  status: SeatStatus;
}

class ShowSeatMappingModel implements ShowSeatMapping {
  mappingId: string;
  show: Show;
  seatType: SeatType;
  price: number;
  status: SeatStatus;

  constructor(
    mappingId: string,
    show: Show,
    seatType: SeatType,
    price: number
  ) {
    this.mappingId = mappingId;
    this.show = show;
    this.seatType = seatType;
    this.price = price;
    this.status = SeatStatus.AVAILABLE; // Default status
  }
}

export { SeatStatus, ShowSeatMapping, ShowSeatMappingModel };
