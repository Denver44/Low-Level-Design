import { Seat } from './seat';
import { Show } from './show';
import { Theater } from './theater';

interface Auditorium {
  auditoriumId: string;
  name: string;
  theater: Theater;
  seats: Seat[];
  shows: Show[];
}

class AuditoriumModel implements Auditorium {
  auditoriumId: string;
  name: string;
  theater: Theater;
  seats: Seat[];
  shows: Show[];

  constructor(auditoriumId: string, name: string, theater: Theater) {
    this.auditoriumId = auditoriumId;
    this.name = name;
    this.theater = theater;
    this.seats = [];
    this.shows = [];
  }
}

export { Auditorium, AuditoriumModel };
