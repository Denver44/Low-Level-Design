import { PricingStrategy } from './pricingStrategy';
import { ShowSeat } from '../common/models/showSeat';
import { ShowSeatType } from '../common/models/showSeatType';
import { DataSource, In } from 'typeorm';

export class BasicPricingStrategy implements PricingStrategy {
  constructor(private dataSource: DataSource) {}

  async calculateAmount(showSeats: ShowSeat[]): Promise<number> {
    // Get unique seat type IDs
    const seatTypeIds = [
      ...new Set(showSeats.map((showSeat) => showSeat.seat.seatType.id)),
    ];

    // Get prices for these seat types
    const showSeatTypes = await this.dataSource
      .getRepository(ShowSeatType)
      .find({
        where: {
          show: { id: showSeats[0].show.id },
          seatType: { id: In(seatTypeIds) },
        },
        relations: ['seatType'],
      });

    // Create price map
    const priceMap = new Map<string, number>();
    showSeatTypes.forEach((sst) => {
      priceMap.set(sst.seatType.id, sst.price);
    });

    // Calculate base amount
    let baseAmount = 0;
    for (const showSeat of showSeats) {
      const seatTypeId = showSeat.seat.seatType.id;
      const price = priceMap.get(seatTypeId) || 0;
      baseAmount += price;
    }

    // Apply taxes (18% GST)
    const gst = baseAmount * 0.18;

    // Apply convenience fee (flat fee)
    const convenienceFee = 20;

    // Return final amount
    return baseAmount + gst + convenienceFee;
  }
}
