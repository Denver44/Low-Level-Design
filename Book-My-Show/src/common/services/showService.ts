// src/services/showService.ts
import { DataSource } from 'typeorm';
import { Show } from '../models/show';
import { ShowSeat } from '../models/showSeat';
import { SeatStatus } from '../models/SeatStatus';

export class ShowService {
  constructor(private dataSource: DataSource) {}

  async createShow(showData: Partial<Show>): Promise<Show> {
    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create and save the show
      const showRepository = queryRunner.manager.getRepository(Show);
      const show = showRepository.create(showData);
      const savedShow = await showRepository.save(show);

      // Get all seats from the auditorium
      if (savedShow.auditorium && savedShow.auditorium.id) {
        const auditoriumRepository =
          queryRunner.manager.getRepository('Auditorium');
        const auditorium = await auditoriumRepository.findOne({
          where: { id: savedShow.auditorium.id },
          relations: ['seats'],
        });

        if (auditorium && auditorium.seats) {
          // Create a ShowSeat for each seat in the auditorium
          const showSeatRepository =
            queryRunner.manager.getRepository(ShowSeat);

          for (const seat of auditorium.seats) {
            const showSeat = new ShowSeat();
            showSeat.show = savedShow;
            showSeat.seat = seat;
            showSeat.status = SeatStatus.AVAILABLE;
            await showSeatRepository.save(showSeat);
          }
        }
      }

      // Commit the transaction
      await queryRunner.commitTransaction();
      return savedShow;
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
