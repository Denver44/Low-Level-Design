import { Auditorium } from './auditorium';
import { City } from './city';
import { BaseModel } from './baseModel';

interface Theater extends BaseModel {
  theaterName: string;
  address: string; // Added address
  city: City;
  auditoriums: Auditorium[];
}

class TheaterModel implements Theater {
  id: string;
  theaterName: string;
  address: string;
  city: City;
  auditoriums: Auditorium[];
  constructor(id: string, theaterName: string, address: string, city: City) {
    this.id = id;
    this.theaterName = theaterName;
    this.address = address;
    this.city = city;
    this.auditoriums = [];
  }
}

export { Theater, TheaterModel };
