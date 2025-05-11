// src/exceptions/seatNotAvailableException.ts
export class SeatNotAvailableException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SeatNotAvailableException';
  }
}
