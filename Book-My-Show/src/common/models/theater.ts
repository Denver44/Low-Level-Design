import { Auditorium } from './auditorium';
import { City } from './city';

interface Theater {
  theaterId: string;
  theaterName: string;
  city: City;
  auditoriums: Auditorium[];
}

class TheaterModel implements Theater {
  theaterId: string;
  theaterName: string;
  city: City;
  auditoriums: Auditorium[];

  constructor(theaterId: string, theaterName: string, city: City) {
    this.theaterId = theaterId;
    this.theaterName = theaterName;
    this.city = city;
    this.auditoriums = [];
  }
}

export { Theater, TheaterModel };
