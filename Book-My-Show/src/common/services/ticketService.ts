// src/services/ticketService.ts
import { DataSource } from 'typeorm';
import { Ticket } from '../models/ticket';
import { ShowSeat } from '../models/showSeat';
import { User } from '../models/user';
import { Show } from '../models/show';
import { SeatStatus } from '../models/SeatStatus';
import { TicketStatus } from '../models/ticketStatus';
import { ShowSeatType } from '../models/showSeatType';

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

      const user = await userRepository.findOneBy({ id: userId });
      const show = await showRepository.findOneBy({ id: showId });

      if (!user || !show) {
        throw new Error('User or Show not found');
      }

      // Find seats and verify availability
      const seatRepository = queryRunner.manager.getRepository('Seat');
      const showSeatRepository = queryRunner.manager.getRepository(ShowSeat);

      // Get all showSeats for these seatIds and this show
      const showSeats = await showSeatRepository.find({
        where: {
          show: { id: showId },
          seat: { id: { $in: seatIds } },
        },
        relations: ['seat', 'seat.seatType'],
      });

      // Verify all seats exist and are available
      if (showSeats.length !== seatIds.length) {
        throw new Error('Some seats not found');
      }

      const unavailableSeats = showSeats.filter(
        (showSeat) => showSeat.status !== SeatStatus.AVAILABLE
      );

      if (unavailableSeats.length > 0) {
        throw new Error('Some seats are not available');
      }

      // Calculate amount based on seat types and prices
      const showSeatTypeRepository =
        queryRunner.manager.getRepository(ShowSeatType);
      let totalAmount = 0;

      // Get all relevant showSeatTypes for this show
      const showSeatTypes = await showSeatTypeRepository.find({
        where: { show: { id: showId } },
        relations: ['seatType'],
      });

      // Create a map for quick lookup of prices by seatTypeId
      const priceMap = new Map<string, number>();
      showSeatTypes.forEach((sst) => {
        priceMap.set(sst.seatType.id, sst.price);
      });

      // Calculate total amount using the price map
      for (const showSeat of showSeats) {
        const seatTypeId = showSeat.seat.seatType.id;
        const price = priceMap.get(seatTypeId) || 0;
        totalAmount += price;

        // Lock the seat
        showSeat.status = SeatStatus.LOCKED;
        await showSeatRepository.save(showSeat);
      }

      // Create the ticket
      const ticketRepository = queryRunner.manager.getRepository(Ticket);
      const ticket = new Ticket();
      ticket.user = user;
      ticket.show = show;
      ticket.amount = totalAmount;
      ticket.status = TicketStatus.PROCESSING;
      ticket.bookingTime = new Date();

      // Get the seats
      const seats = showSeats.map((showSeat) => showSeat.seat);
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
