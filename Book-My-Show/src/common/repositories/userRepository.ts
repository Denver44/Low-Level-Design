// src/repositories/userRepository.ts
import { BaseRepository } from './baseRepository';
import { User } from '../models/user';

export class UserRepository extends BaseRepository {
  async findById(id: string): Promise<User | null> {
    return this.dataSource.getRepository(User).findOneBy({ id });
  }
}
