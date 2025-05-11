import { Auditorium } from './auditorium';
import { SeatType } from './seatType';

interface Show {
  showId: string;
  movieName: string;
  startTime: Date;
  endTime: Date;
  auditorium: Auditorium;
  seatPricing: Map<SeatType, number>; // From Note 4: seatPricing map
}

class ShowModel implements Show {
  showId: string;
  movieName: string;
  startTime: Date;
  endTime: Date;
  auditorium: Auditorium;
  seatPricing: Map<SeatType, number>;

  constructor(
    showId: string,
    movieName: string,
    startTime: Date,
    endTime: Date,
    auditorium: Auditorium
  ) {
    this.showId = showId;
    this.movieName = movieName;
    this.startTime = startTime;
    this.endTime = endTime;
    this.auditorium = auditorium;
    this.seatPricing = new Map<SeatType, number>();
  }
}

export { Show, ShowModel };
