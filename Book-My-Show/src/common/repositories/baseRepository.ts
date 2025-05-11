// src/repositories/baseRepository.ts
import { DataSource } from 'typeorm';

export class BaseRepository {
  constructor(protected dataSource: DataSource) {}
}
