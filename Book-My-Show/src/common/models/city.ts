import { Theater } from './theater';

interface City {
  cityId: string;
  cityName: string;
  theaters: Theater[];
}

class CityModel implements City {
  cityId: string;
  cityName: string;
  theaters: Theater[];

  constructor(cityId: string, cityName: string) {
    this.cityId = cityId;
    this.cityName = cityName;
    this.theaters = [];
  }
}

export { City, CityModel };
