import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InitialSeeder } from '../database/seeders/initial.seeder';

@Injectable()
export class SeedCommand {
  constructor(private dataSource: DataSource) {}

  @Command({
    command: 'seed:initial',
    describe: 'Seed the database with initial data',
  })
  async seed() {
    try {
      const seeder = new InitialSeeder(this.dataSource);
      await seeder.run();
      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  }
} 