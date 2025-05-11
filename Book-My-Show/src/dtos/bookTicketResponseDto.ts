// src/dtos/bookTicketResponseDto.ts
export class BookTicketResponseDto {
  ticketId!: string;
  amount!: number;
  status!: string;
  showId!: string;
  seats!: {
    id: string;
    seatNumber: string;
    type: string;
  }[];
  bookingTime!: Date;
  auditoriumName?: string;
  movieName?: string;
  showTime?: Date;
}
