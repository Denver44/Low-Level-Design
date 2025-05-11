import { Feature } from './feature';
import { Seat } from './seat';
import { Show } from './show';
import { Theater } from './theater';
import { BaseModel } from './baseModel';

interface Auditorium extends BaseModel {
  name: string;
  theater: Theater;
  seats: Seat[];
  shows: Show[];
  features: Feature[]; // Added features list
}

class AuditoriumModel implements Auditorium {
  id: string;
  name: string;
  theater: Theater;
  seats: Seat[];
  shows: Show[];
  features: Feature[]; // Added features list
  constructor(id: string, name: string, theater: Theater) {
    this.id = id;
    this.name = name;
    this.theater = theater;
    this.seats = [];
    this.shows = [];
    this.features = [];
  }
}

export { Auditorium, AuditoriumModel };
