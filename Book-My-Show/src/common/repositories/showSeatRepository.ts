// src/repositories/showSeatRepository.ts
import { BaseRepository } from './baseRepository';
import { In, EntityManager } from 'typeorm';
import { ShowSeat } from '../models/showSeat';
import { Show } from '../models/show';
import { SeatStatus } from '../models/SeatStatus';
import { SeatNotAvailableException } from '../../exceptions/seatNotAvailableException';

export class ShowSeatRepository extends BaseRepository {
  async findByShowIdAndSeatIds(
    showId: string,
    seatIds: string[]
  ): Promise<ShowSeat[]> {
    return this.dataSource.getRepository(ShowSeat).find({
      where: {
        show: { id: showId },
        seat: { id: In(seatIds) },
      },
      relations: ['seat', 'seat.seatType'],
    });
  }

  // Method to find and lock seats in one database operation
  async findAndLockShowSeats(
    showId: string,
    seatIds: string[],
    entityManager: EntityManager
  ): Promise<ShowSeat[]> {
    // Using raw query for pessimistic locking
    const showSeats = await entityManager
      .createQueryBuilder(ShowSeat, 'ss')
      .setLock('pessimistic_write')
      .innerJoinAndSelect('ss.seat', 'seat')
      .innerJoinAndSelect('seat.seatType', 'seatType')
      .where('ss.show.id = :showId', { showId })
      .andWhere('seat.id IN (:...seatIds)', { seatIds })
      .getMany();

    // Check if all requested seats were found
    if (showSeats.length !== seatIds.length) {
      throw new Error('One or more seats not found');
    }

    // Check seat availability
    for (const showSeat of showSeats) {
      if (showSeat.status !== SeatStatus.AVAILABLE) {
        throw new SeatNotAvailableException(
          'One or more seats are not available'
        );
      }
    }

    return showSeats;
  }
}
