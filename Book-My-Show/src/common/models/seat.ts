import { Auditorium } from './auditorium';
import { SeatType } from './seatType';
import { BaseModel } from './baseModel';

interface Seat extends BaseModel {
  seatNumber: string;
  row: number;
  column: number;
  seatType: SeatType; // Make sure this references SeatType
  auditorium: Auditorium;
}

class SeatModel implements Seat {
  id: string;
  seatNumber: string;
  row: number;
  column: number;
  seatType: SeatType;
  auditorium: Auditorium;
  constructor(
    id: string,
    seatNumber: string,
    row: number,
    column: number,
    seatType: SeatType,
    auditorium: Auditorium
  ) {
    this.id = id;
    this.seatNumber = seatNumber;
    this.row = row;
    this.column = column;
    this.seatType = seatType;
    this.auditorium = auditorium;
  }
}

export { Seat, SeatModel };
