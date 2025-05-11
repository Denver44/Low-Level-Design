// From Note 4: SeatType class
import { BaseModel } from './baseModel';

interface SeatType extends BaseModel {
  name: string;
  description?: string; // Optional field
}

class SeatTypeModel implements SeatType {
  id: string;
  name: string;
  description?: string;

  constructor(id: string, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

export { SeatType, SeatTypeModel };
