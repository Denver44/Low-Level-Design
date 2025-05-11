// src/dtos/bookTicketResponseDto.ts
export class BookTicketResponseDto {
  ticketId!: string;
  amount!: number;
  status!: string;
  showId!: string;
  seatIds!: string[];
  bookingTime!: Date;
}
