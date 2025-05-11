// src/repositories/seatRepository.ts
import { BaseRepository } from './baseRepository';
import { In } from 'typeorm';
import { Seat } from '../models/seat';

export class SeatRepository extends BaseRepository {
  async findByIds(ids: string[]): Promise<Seat[]> {
    return this.dataSource.getRepository(Seat).findBy({ id: In(ids) });
  }
}
