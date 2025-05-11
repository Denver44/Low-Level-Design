import { Auditorium } from './auditorium';
import { Movie } from './movie';
import { ShowSeatMapping } from './showSeatMapping';

// Feature enum
export enum Feature {
  IMAX = 'IMAX',
  THREE_D = 'THREE_D',
  DOLBY_ATMOS = 'DOLBY_ATMOS',
  DOLBY_VISION = 'DOLBY_VISION',
}

interface Show {
  showId: string;
  movie: Movie; // Changed from movieName to Movie object
  startTime: Date;
  endTime: Date;
  language: string;
  features: Feature[]; // Added features list
  auditorium: Auditorium;
  showSeatMappings?: ShowSeatMapping[];
}

class ShowModel implements Show {
  showId: string;
  movie: Movie;
  startTime: Date;
  endTime: Date;
  language: string;
  features: Feature[];
  auditorium: Auditorium;
  showSeatMappings?: ShowSeatMapping[];

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
    this.showSeatMappings = [];
  }
}

export { Show, ShowModel };
