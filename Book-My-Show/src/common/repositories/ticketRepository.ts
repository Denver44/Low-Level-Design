// src/repositories/ticketRepository.ts
import { BaseRepository } from './baseRepository';
import { Ticket } from '../models/ticket';

export class TicketRepository extends BaseRepository {
  async save(ticket: Ticket): Promise<Ticket> {
    return this.dataSource.getRepository(Ticket).save(ticket);
  }

  async findById(id: string): Promise<Ticket | null> {
    return this.dataSource.getRepository(Ticket).findOneBy({ id });
  }
}
