import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    if (!this.dataSource.isInitialized) {
      try {
        await this.dataSource.initialize();
        console.log('Database connection established successfully');
      } catch (error) {
        console.error('Error connecting to the database', error);
      }
    } else {
      console.log('Database connection already established');
    }
  }
}
