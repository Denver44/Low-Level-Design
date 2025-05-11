import { Auditorium } from './auditorium';
import { Language } from './language';
import { Movie } from './movie';
import { ShowSeat } from './showSeat';
import { ShowSeatType } from './showSeatType';
import { BaseModel } from './baseModel';

export enum Feature {
  IMAX = 'IMAX',
  THREE_D = 'THREE_D',
  DOLBY_ATMOS = 'DOLBY_ATMOS',
  DOLBY_VISION = 'DOLBY_VISION',
}

interface Show extends BaseModel {
  movie: Movie;
  startTime: Date;
  endTime: Date;
  language: Language; // Now using Language enum
  features: Feature[];
  auditorium: Auditorium;
  showSeatTypes?: ShowSeatType[];
  showSeats?: ShowSeat[];
}

class ShowModel implements Show {
  id: string;
  movie: Movie;
  startTime: Date;
  endTime: Date;
  language: Language; // Now using Language enum
  features: Feature[];
  auditorium: Auditorium;
  showSeatTypes?: ShowSeatType[];
  showSeats?: ShowSeat[];

  constructor(
    id: string,
    movie: Movie,
    startTime: Date,
    endTime: Date,
    language: Language,
    features: Feature[],
    auditorium: Auditorium
  ) {
    this.id = id;
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
