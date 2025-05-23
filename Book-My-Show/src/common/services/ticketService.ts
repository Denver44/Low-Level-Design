// src/services/ticketService.ts
import { DataSource, In } from 'typeorm';
import { Ticket } from '../models/ticket';
import { ShowSeat } from '../models/showSeat';
import { User } from '../models/user';
import { Show } from '../models/show';
import { Seat } from '../models/seat';
import { SeatStatus } from '../models/SeatStatus';
import { TicketStatus } from '../models/ticketStatus';
import { SeatRepository } from '../repositories/seatRepository';
import { ShowSeatRepository } from '../repositories/showSeatRepository';
import { ShowRepository } from '../repositories/showRepository';
import { UserRepository } from '../repositories/userRepository';
import { TicketRepository } from '../repositories/ticketRepository';
import { InvalidArgumentException } from '../../exceptions/invalidArgumentException';
import { SeatNotAvailableException } from '../../exceptions/seatNotAvailableException';
import { PricingStrategy } from '../../strategies/pricingStrategy';
import { BasicPricingStrategy } from '../../strategies/basicPricingStrategy';

export class TicketService {
  private seatRepository: SeatRepository;
  private showSeatRepository: ShowSeatRepository;
  private showRepository: ShowRepository;
  private userRepository: UserRepository;
  private ticketRepository: TicketRepository;
  private pricingStrategy: PricingStrategy;

  constructor(private dataSource: DataSource) {
    this.seatRepository = new SeatRepository(dataSource);
    this.showSeatRepository = new ShowSeatRepository(dataSource);
    this.showRepository = new ShowRepository(dataSource);
    this.userRepository = new UserRepository(dataSource);
    this.ticketRepository = new TicketRepository(dataSource);
    this.pricingStrategy = new BasicPricingStrategy(dataSource);
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
      // 1. Fetch the user by ID
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });

      if (!user) {
        throw new InvalidArgumentException(
          `User with ID ${userId} does not exist.`
        );
      }

      // 2. Fetch the show by ID
      const show = await queryRunner.manager.findOne(Show, {
        where: { id: showId },
      });

      if (!show) {
        throw new InvalidArgumentException(
          `Show with ID ${showId} does not exist.`
        );
      }

      // 3. Find and lock the seats in a single operation with pessimistic locking
      const showSeats = await this.showSeatRepository.findAndLockShowSeats(
        showId,
        seatIds,
        queryRunner.manager
      );

      // 4. Lock all seats (set status to LOCKED and add timestamp)
      const currentTime = new Date();
      for (const showSeat of showSeats) {
        showSeat.status = SeatStatus.LOCKED;
        showSeat.lockedAt = currentTime;
      }

      // 5. Save all locked seats at once
      await queryRunner.manager.save(ShowSeat, showSeats);

      // 6. Fetch all seat objects for the ticket
      const seats = await queryRunner.manager.find(Seat, {
        where: { id: In(seatIds) },
      });

      // 7. Calculate the ticket amount using pricing strategy
      const totalAmount = await this.pricingStrategy.calculateAmount(showSeats);

      // 8. Create and save the Ticket
      const ticket = new Ticket();
      ticket.user = user;
      ticket.show = show;
      ticket.seats = seats;
      ticket.amount = totalAmount;
      ticket.status = TicketStatus.PROCESSING;
      ticket.bookingTime = new Date();

      const savedTicket = await queryRunner.manager.save(Ticket, ticket);

      // 9. Commit the transaction
      await queryRunner.commitTransaction();

      return savedTicket;
    } catch (error) {
      // Rollback in case of error
      await queryRunner.rollbackTransaction();

      // Re-throw the error to be handled by the controller
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
