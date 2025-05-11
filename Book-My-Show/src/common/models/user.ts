import { BaseModel } from './baseModel';
import { Ticket } from './ticket';

interface User extends BaseModel {
  age: number; // Added age
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  tickets: Ticket[];
}

class UserModel implements User {
  id: string;
  age: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  tickets: Ticket[];

  constructor(
    id: string,
    name: string,
    age: number,
    email: string,
    password: string,
    phoneNumber: string
  ) {
    this.id = id;
    this.age = age;
    this.name = name;
    this.email = email;
    this.password = password; // In a real app, this should be hashed
    this.phoneNumber = phoneNumber;
    this.tickets = [];
  }
}

export { User, UserModel };
