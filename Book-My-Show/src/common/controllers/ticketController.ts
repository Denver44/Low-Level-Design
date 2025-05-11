// src/controllers/ticketController.ts
import { Request, Response } from 'express';
import { TicketService } from '../services/ticketService';
import { BookTicketRequestDto } from '../../dto/bookTicketRequestDto';
import { BookTicketResponseDto } from '../../dto/bookTicketResponseDto';

export class TicketController {
  constructor(private ticketService: TicketService) {}

  async bookTicket(req: Request, res: Response): Promise<void> {
    try {
      const bookTicketRequest: BookTicketRequestDto = req.body;

      // Validate request
      if (
        !bookTicketRequest.userId ||
        !bookTicketRequest.showId ||
        !bookTicketRequest.seatIds ||
        bookTicketRequest.seatIds.length === 0
      ) {
        res
          .status(400)
          .json({ error: 'Invalid request. Missing required fields.' });
        return;
      }

      // Call ticket service to book the ticket
      const ticket = await this.ticketService.createTicket(
        bookTicketRequest.userId,
        bookTicketRequest.showId,
        bookTicketRequest.seatIds
      );

      // Transform to response DTO
      const response: BookTicketResponseDto = {
        ticketId: ticket.id,
        amount: ticket.amount,
        status: ticket.status,
        showId: ticket.show.id,
        seatIds: ticket.seats.map((seat) => seat.id),
        bookingTime: ticket.bookingTime,
      };

      res.status(201).json(response);
    } catch (error: any) {
      console.error('Error booking ticket:', error);

      // Handle specific errors
      if (error.message === 'User or Show not found') {
        res.status(404).json({ error: error.message });
      } else if (error.message === 'Some seats are not available') {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
