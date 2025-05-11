import { BaseRepository } from './baseRepository';
import { In } from 'typeorm';
import { Seat } from '../models/seat';

export class SeatRepository extends BaseRepository {
  async findAllById(ids: string[]): Promise<Seat[]> {
    return this.dataSource.getRepository(Seat).findBy({ id: In(ids) });
  }
}
