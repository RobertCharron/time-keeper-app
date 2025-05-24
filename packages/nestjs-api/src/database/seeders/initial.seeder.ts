import { DataSource } from 'typeorm';
import { Station } from '../../stations/entities/station.entity';
import { Activity } from '../../activities/entities/activity.entity';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export class InitialSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    try {
      // Create a test user
      const userRepository = this.dataSource.getRepository(User);
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = userRepository.create({
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User',
      });
      await userRepository.save(user);

      // Create stations
      const stationRepository = this.dataSource.getRepository(Station);
      const stations = [
        {
          name: 'Kitchen',
          activities: [
            { name: 'Cooking', isActive: true },
            { name: 'Cleaning', isActive: true },
            { name: 'Dishwashing', isActive: true },
          ],
        },
        {
          name: 'Office',
          activities: [
            { name: 'Coding', isActive: true },
            { name: 'Meetings', isActive: true },
            { name: 'Documentation', isActive: true },
          ],
        },
        {
          name: 'Gym',
          activities: [
            { name: 'Cardio', isActive: true },
            { name: 'Weight Training', isActive: true },
            { name: 'Stretching', isActive: true },
          ],
        },
        {
          name: 'Garden',
          activities: [
            { name: 'Planting', isActive: true },
            { name: 'Watering', isActive: true },
            { name: 'Weeding', isActive: true },
          ],
        },
      ];

      const activityRepository = this.dataSource.getRepository(Activity);

      for (const stationData of stations) {
        const station = stationRepository.create({
          name: stationData.name,
          isActive: true,
        });
        await stationRepository.save(station);

        for (const activityData of stationData.activities) {
          const activity = activityRepository.create({
            ...activityData,
            station,
          });
          await activityRepository.save(activity);
        }
      }

      console.log('Seeder completed successfully');
    } catch (error) {
      console.error('Error running seeder:', error);
      throw error;
    }
  }
} 