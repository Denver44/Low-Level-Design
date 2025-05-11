import { Auditorium } from './auditorium';

// From Note 5: SeatStatus enum
enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  RESERVED = 'RESERVED',
}

interface Seat {
  seatId: string;
  seatNumber: string;
  seatType: string; // e.g., VIP, Regular
  status: SeatStatus;
  auditorium: Auditorium;
}

class SeatModel implements Seat {
  seatId: string;
  seatNumber: string;
  seatType: string;
  status: SeatStatus;
  auditorium: Auditorium;

  constructor(
    seatId: string,
    seatNumber: string,
    seatType: string,
    auditorium: Auditorium
  ) {
    this.seatId = seatId;
    this.seatNumber = seatNumber;
    this.seatType = seatType;
    this.status = SeatStatus.AVAILABLE;
    this.auditorium = auditorium;
  }
}

export { SeatStatus, Seat, SeatModel };
