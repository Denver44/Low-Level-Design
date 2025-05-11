import { BaseModel } from './baseModel';
import { Theater } from './theater';

interface City extends BaseModel {
  name: string;
  theaters: Theater[];
}

class CityModel implements City {
  id: string;
  name: string;
  theaters: Theater[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.theaters = [];
  }
}

export { City, CityModel };
