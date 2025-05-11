import { Ticket } from './ticket';

interface User {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  tickets: Ticket[];
}

class UserModel implements User {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  tickets: Ticket[];

  constructor(
    userId: string,
    name: string,
    email: string,
    phoneNumber: string
  ) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.tickets = [];
  }
}

export { User, UserModel };
