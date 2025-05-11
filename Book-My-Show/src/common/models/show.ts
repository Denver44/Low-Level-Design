import { Auditorium } from './auditorium';
import { Movie } from './movie';
import { ShowSeat } from './showSeat';
import { ShowSeatType } from './showSeatType';

export enum Feature {
  IMAX = 'IMAX',
  THREE_D = 'THREE_D',
  DOLBY_ATMOS = 'DOLBY_ATMOS',
  DOLBY_VISION = 'DOLBY_VISION',
}

interface Show {
  showId: string;
  movie: Movie;
  startTime: Date;
  endTime: Date;
  language: string;
  features: Feature[];
  auditorium: Auditorium;
  showSeatTypes?: ShowSeatType[]; // Updated to use ShowSeatType
  showSeats?: ShowSeat[]; // Updated to use ShowSeat
}

class ShowModel implements Show {
  showId: string;
  movie: Movie;
  startTime: Date;
  endTime: Date;
  language: string;
  features: Feature[];
  auditorium: Auditorium;
  showSeatTypes?: ShowSeatType[];
  showSeats?: ShowSeat[];

  constructor(
    showId: string,
    movie: Movie,
    startTime: Date,
    endTime: Date,
    language: string,
    features: Feature[],
    auditorium: Auditorium
  ) {
    this.showId = showId;
    this.movie = movie;
    this.startTime = startTime;
    this.endTime = endTime;
    this.language = language;
    this.features = features;
    this.auditorium = auditorium;
    this.showSeatTypes = [];
    this.showSeats = [];
  }
}

export { Show, ShowModel };
