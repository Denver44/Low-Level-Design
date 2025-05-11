import { Ticket } from './ticket';

interface User {
  userId: string;
  name: string;
  email: string;
  password: string; // Added password
  phoneNumber: string;
  tickets: Ticket[];
}

class UserModel implements User {
  userId: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  tickets: Ticket[];

  constructor(
    userId: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string
  ) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password; // Should be hashed in a real implementation
    this.phoneNumber = phoneNumber;
    this.tickets = [];
  }
}

export { User, UserModel };
