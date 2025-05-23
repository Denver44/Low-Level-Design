import { DataSource } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'bookmyshow',
  synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in development
  logging: process.env.NODE_ENV !== 'production',
  entities: [path.join(__dirname, '../common/models/*.{js,ts}')],
  migrations: [path.join(__dirname, '../migrations/*.{js,ts}')],
  subscribers: [],
});

export const initializeDatabase = async () => {
  try {
    // Create a temporary connection without specifying a database
    const tempDataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      synchronize: false,
      logging: false,
    });

    await tempDataSource.initialize();

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'bookmyshow';
    await tempDataSource.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await tempDataSource.destroy();

    // Now initialize the main data source
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Error during database connection:', error);
    throw error;
  }
};
