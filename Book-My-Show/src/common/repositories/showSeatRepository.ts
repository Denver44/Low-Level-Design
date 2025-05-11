// src/repositories/showSeatRepository.ts
import { BaseRepository } from './baseRepository';
import { In } from 'typeorm';
import { ShowSeat } from '../models/showSeat';

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
}
