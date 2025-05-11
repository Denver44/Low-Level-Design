import { SeatType } from './seatType';
import { Show } from './show';

interface ShowSeatType {
  id: string;
  show: Show;
  seatType: SeatType;
  price: number;
}

class ShowSeatTypeModel implements ShowSeatType {
  id: string;
  show: Show;
  seatType: SeatType;
  price: number;

  constructor(id: string, show: Show, seatType: SeatType, price: number) {
    this.id = id;
    this.show = show;
    this.seatType = seatType;
    this.price = price;
  }
}

export { ShowSeatType, ShowSeatTypeModel };
