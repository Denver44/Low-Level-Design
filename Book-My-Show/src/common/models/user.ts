import { Ticket } from './ticket';
import { BaseModel } from './baseModel';

interface User extends BaseModel {
  name: string;
  email: string;
  password: string; // Added password
  phoneNumber: string;
  tickets: Ticket[];
}

class UserModel implements User {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  tickets: Ticket[];
  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // Should be hashed in a real implementation
    this.phoneNumber = phoneNumber;
    this.tickets = [];
  }
}

export { User, UserModel };
