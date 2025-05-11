// src/services/ticketService.ts
import { DataSource, In } from 'typeorm';
import { Ticket } from '../models/ticket';
import { ShowSeat } from '../models/showSeat';
import { User } from '../models/user';
import { Show } from '../models/show';
import { SeatStatus } from '../models/SeatStatus';
import { TicketStatus } from '../models/ticketStatus';
import { ShowSeatType } from '../models/showSeatType';
import { SeatRepository } from '../repositories/seatRepository';
import { ShowSeatRepository } from '../repositories/showSeatRepository';

export class TicketService {
  private seatRepository: SeatRepository;
  private showSeatRepository: ShowSeatRepository;

  constructor(private dataSource: DataSource) {
    this.seatRepository = new SeatRepository(dataSource);
    this.showSeatRepository = new ShowSeatRepository(dataSource);
  }

  async createTicket(
    userId: string,
    showId: string,
    seatIds: string[]
  ): Promise<Ticket> {
    // Start a transaction for atomic operations
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Find user and show
      const userRepository = queryRunner.manager.getRepository(User);
      const showRepository = queryRunner.manager.getRepository(Show);

      const user = await userRepository.findOneBy({ id: userId });
      const show = await showRepository.findOneBy({ id: showId });

      if (!user || !show) {
        throw new Error('User or Show not found');
      }

      // 2. Get ShowSeat objects using transaction manager
      const showSeats = await queryRunner.manager.find(ShowSeat, {
        where: {
          show: { id: showId },
          seat: { id: In(seatIds) },
        },
        relations: ['seat', 'seat.seatType'],
      });

      // Verify all seats exist
      if (showSeats.length !== seatIds.length) {
        throw new Error('One or more seats not found');
      }

      // Check if all seats are available
      for (const showSeat of showSeats) {
        if (showSeat.status !== SeatStatus.AVAILABLE) {
          throw new Error('One or more seats are not available');
        }
      }

      // 3. Lock all seats (set status to LOCKED)
      for (const showSeat of showSeats) {
        showSeat.status = SeatStatus.LOCKED;
        await queryRunner.manager.save(ShowSeat, showSeat);
      }

      // 4. Calculate the ticket amount
      const totalAmount = await this.calculateAmount(showSeats, queryRunner);

      // 5. Create and save the Ticket
      const ticket = new Ticket();
      ticket.user = user;
      ticket.show = show;
      ticket.seats = showSeats.map((showSeat) => showSeat.seat);
      ticket.amount = totalAmount;
      ticket.status = TicketStatus.PROCESSING;
      ticket.bookingTime = new Date();

      const savedTicket = await queryRunner.manager.save(Ticket, ticket);

      // 6. Commit the transaction
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

  // Helper method to calculate ticket amount based on seat types
  private async calculateAmount(
    showSeats: ShowSeat[],
    queryRunner: any
  ): Promise<number> {
    let totalAmount = 0;

    // Get unique seat type IDs from the show seats
    const seatTypeIds = [
      ...new Set(showSeats.map((showSeat) => showSeat.seat.seatType.id)),
    ];

    // Get all relevant show seat types with prices
    const showSeatTypes = await queryRunner.manager.find(ShowSeatType, {
      where: {
        show: { id: showSeats[0].show.id },
        seatType: { id: In(seatTypeIds) },
      },
      relations: ['seatType'],
    });

    // Create a price map for quick lookup
    const priceMap = new Map<string, number>();
    showSeatTypes.forEach((sst: any) => {
      priceMap.set(sst.seatType.id, sst.price);
    });

    // Calculate total amount
    for (const showSeat of showSeats) {
      const seatTypeId = showSeat.seat.seatType.id;
      const price = priceMap.get(seatTypeId) || 0;
      totalAmount += price;
    }

    return totalAmount;
  }
}
