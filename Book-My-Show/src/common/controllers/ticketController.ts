// src/controllers/ticketController.ts
import { Request, Response } from 'express';
import { TicketService } from '../services/ticketService';
import { BookTicketRequestDto } from '../../dto/bookTicketRequestDto';
import { BookTicketResponseDto } from '../../dto/bookTicketResponseDto';

export class TicketController {
  // Constructor injection for better testability
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

      // Map service response to DTO
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
      };

      res.status(201).json(response);
    } catch (error: any) {
      // Error handling simplified to controller responsibility
      if (error.message === 'User or Show not found') {
        res.status(404).json({ error: error.message });
      } else if (
        error.message === 'Some seats are not available' ||
        error.message === 'Some seats not found'
      ) {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
