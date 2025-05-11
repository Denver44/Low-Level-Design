import { Feature } from './feature';
import { Seat } from './seat';
import { Show } from './show';
import { Theater } from './theater';

interface Auditorium {
  auditoriumId: string;
  name: string;
  theater: Theater;
  seats: Seat[];
  shows: Show[];
  features: Feature[]; // Added features list
}

class AuditoriumModel implements Auditorium {
  auditoriumId: string;
  name: string;
  theater: Theater;
  seats: Seat[];
  shows: Show[];
  features: Feature[]; // Added features list

  constructor(auditoriumId: string, name: string, theater: Theater) {
    this.auditoriumId = auditoriumId;
    this.name = name;
    this.theater = theater;
    this.seats = [];
    this.shows = [];
    this.features = [];
  }
}

export { Auditorium, AuditoriumModel };
