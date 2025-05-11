import { Auditorium } from './auditorium';
import { ShowSeatMapping } from './showSeatMapping';

interface Show {
  showId: string;
  movieName: string;
  startTime: Date;
  endTime: Date;
  language: string; // Added language field
  auditorium: Auditorium;
  showSeatMappings: ShowSeatMapping[]; // Added ShowSeatMapping relationship
}

class ShowModel implements Show {
  showId: string;
  movieName: string;
  startTime: Date;
  endTime: Date;
  language: string;
  auditorium: Auditorium;
  showSeatMappings: ShowSeatMapping[];

  constructor(
    showId: string,
    movieName: string,
    startTime: Date,
    endTime: Date,
    language: string,
    auditorium: Auditorium
  ) {
    this.showId = showId;
    this.movieName = movieName;
    this.startTime = startTime;
    this.endTime = endTime;
    this.language = language;
    this.auditorium = auditorium;
    this.showSeatMappings = [];
  }
}

export { Show, ShowModel };
