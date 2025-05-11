// src/repositories/showRepository.ts
import { BaseRepository } from './baseRepository';
import { Show } from '../models/show';

export class ShowRepository extends BaseRepository {
  async findById(id: string): Promise<Show | null> {
    return this.dataSource.getRepository(Show).findOneBy({ id });
  }
}
