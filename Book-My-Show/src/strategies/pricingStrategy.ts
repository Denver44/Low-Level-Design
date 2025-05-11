// src/strategies/pricingStrategy.ts
import { ShowSeat } from '../common/models/showSeat';

export interface PricingStrategy {
  calculateAmount(showSeats: ShowSeat[]): Promise<number>;
}
