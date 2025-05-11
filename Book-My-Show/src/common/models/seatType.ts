// From Note 4: SeatType class
interface SeatType {
  seatTypeId: string;
  name: string;
  description?: string; // Optional field
}

class SeatTypeModel implements SeatType {
  seatTypeId: string;
  name: string;
  description?: string;

  constructor(seatTypeId: string, name: string, description?: string) {
    this.seatTypeId = seatTypeId;
    this.name = name;
    this.description = description;
  }
}

export { SeatType, SeatTypeModel };
