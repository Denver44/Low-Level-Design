import { Auditorium } from './auditorium';
import { City } from './city';

interface Theater {
  theaterId: string;
  theaterName: string;
  address: string; // Added address
  city: City;
  auditoriums: Auditorium[];
}

class TheaterModel implements Theater {
  theaterId: string;
  theaterName: string;
  address: string;
  city: City;
  auditoriums: Auditorium[];

  constructor(
    theaterId: string,
    theaterName: string,
    address: string,
    city: City
  ) {
    this.theaterId = theaterId;
    this.theaterName = theaterName;
    this.address = address;
    this.city = city;
    this.auditoriums = [];
  }
}

export { Theater, TheaterModel };
