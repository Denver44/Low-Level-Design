// src/services/ticketService.ts
import { DataSource } from 'typeorm';
import { Ticket } from '../models/ticket';
import { ShowSeat } from '../models/showSeat';
import { User } from '../models/user';
import { Show } from '../models/show';
import { SeatStatus } from '../models/SeatStatus';
import { TicketStatus } from '../models/ticketStatus';

export class TicketService {
  constructor(private dataSource: DataSource) {}

  async createTicket(
    userId: string,
    showId: string,
    seatIds: string[]
  ): Promise<Ticket> {
    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find user and show
      const userRepository = queryRunner.manager.getRepository(User);
      const showRepository = queryRunner.manager.getRepository(Show);
      const showSeatRepository = queryRunner.manager.getRepository(ShowSeat);

      const user = await userRepository.findOneBy({ id: userId });
      const show = await showRepository.findOneBy({ id: showId });

      if (!user || !show) {
        throw new Error('User or Show not found');
      }

      // Find and lock the seats
      const showSeats = await showSeatRepository.find({
        where: {
          show: { id: showId },
          seat: { id: { $in: seatIds } }, // In operator
          status: SeatStatus.AVAILABLE,
        },
      });

      if (showSeats.length !== seatIds.length) {
        throw new Error('Some seats are not available');
      }

      // Update seat status to LOCKED
      for (const showSeat of showSeats) {
        showSeat.status = SeatStatus.LOCKED;
        await showSeatRepository.save(showSeat);
      }

      // Calculate total amount (you might want to get this from ShowSeatType prices)
      const totalAmount = showSeats.length * 100; // Simplified example

      // Create ticket
      const ticketRepository = queryRunner.manager.getRepository(Ticket);
      const ticket = new Ticket();
      ticket.user = user;
      ticket.show = show;
      ticket.amount = totalAmount;
      ticket.status = TicketStatus.PROCESSING;
      ticket.bookingTime = new Date();

      // Save the seats to the ticket
      const seatRepository = queryRunner.manager.getRepository('Seat');
      const seats = await seatRepository.findByIds(seatIds);
      ticket.seats = seats;

      const savedTicket = await ticketRepository.save(ticket);

      // Commit the transaction
      await queryRunner.commitTransaction();
      return savedTicket;
    } catch (error) {
      // Rollback in case of error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
