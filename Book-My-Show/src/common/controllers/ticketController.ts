// src/controllers/ticketController.ts
import { Request, Response } from 'express';
import { TicketService } from '../services/ticketService';
import { BookTicketRequestDto } from '../../dtos/bookTicketRequestDto';
import { BookTicketResponseDto } from '../../dtos/bookTicketResponseDto';
import { InvalidArgumentException } from '../../exceptions/invalidArgumentException';
import { SeatNotAvailableException } from '../../exceptions/seatNotAvailableException';

export class TicketController {
  constructor(private ticketService: TicketService) {}

  async bookTicket(req: Request, res: Response): Promise<void> {
    try {
      const request: BookTicketRequestDto = req.body;

      // Basic validation only - no business logic
      if (
        !request.userId ||
        !request.showId ||
        !request.seatIds ||
        request.seatIds.length === 0
      ) {
        res
          .status(400)
          .json({ error: 'Invalid request. Missing required fields.' });
        return;
      }

      // Pass only raw IDs to service, not the entire DTO
      const ticket = await this.ticketService.createTicket(
        request.userId,
        request.showId,
        request.seatIds
      );

      // Map service response to DTO - focus on returning all relevant ticket info
      const response: BookTicketResponseDto = {
        ticketId: ticket.id,
        amount: ticket.amount,
        status: ticket.status,
        showId: ticket.show.id,
        seats: ticket.seats.map((seat) => ({
          id: seat.id,
          seatNumber: seat.seatNumber,
          type: seat.seatType.name,
        })),
        bookingTime: ticket.bookingTime,
        auditoriumName: ticket.show.auditorium?.name,
        movieName: ticket.show.movie?.title,
        showTime: ticket.show.startTime,
      };

      // Return 201 (Created) for successful ticket creation
      res.status(201).json(response);
    } catch (error) {
      // Handle different types of exceptions with appropriate HTTP status codes
      if (error instanceof InvalidArgumentException) {
        res.status(400).json({ error: error.message }); // Bad Request
      } else if (error instanceof SeatNotAvailableException) {
        res.status(409).json({ error: error.message }); // Conflict
      } else {
        console.error('Unexpected error during ticket booking:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
