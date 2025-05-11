import { Auditorium } from './auditorium';
import { SeatType } from './seatType';

enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  RESERVED = 'RESERVED',
}

interface Seat {
  seatId: string;
  seatNumber: string;
  row: number; // Added row
  column: number; // Added column
  seatType: SeatType;
  status: SeatStatus;
  auditorium: Auditorium;
}

class SeatModel implements Seat {
  seatId: string;
  seatNumber: string;
  row: number;
  column: number;
  seatType: SeatType;
  status: SeatStatus;
  auditorium: Auditorium;

  constructor(
    seatId: string,
    seatNumber: string,
    row: number,
    column: number,
    seatType: SeatType,
    auditorium: Auditorium
  ) {
    this.seatId = seatId;
    this.seatNumber = seatNumber;
    this.row = row;
    this.column = column;
    this.seatType = seatType;
    this.status = SeatStatus.AVAILABLE;
    this.auditorium = auditorium;
  }
}

export { SeatStatus, Seat, SeatModel };
