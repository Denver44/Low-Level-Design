import { Auditorium } from './auditorium';
import { SeatType } from './seatType';

interface Seat {
  seatId: string;
  seatNumber: string;
  row: number;
  column: number;
  seatType: SeatType; // Make sure this references SeatType
  auditorium: Auditorium;
}

class SeatModel implements Seat {
  seatId: string;
  seatNumber: string;
  row: number;
  column: number;
  seatType: SeatType;
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
    this.auditorium = auditorium;
  }
}

export { Seat, SeatModel };
