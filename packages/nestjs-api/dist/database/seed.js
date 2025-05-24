"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const station_entity_1 = require("../stations/entities/station.entity");
const activity_entity_1 = require("../activities/entities/activity.entity");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcrypt");
async function seed() {
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'time_keeper',
        entities: [user_entity_1.User, station_entity_1.Station, activity_entity_1.Activity],
        synchronize: true,
    });
    try {
        await dataSource.initialize();
        console.log('Database connection established');
        const userRepository = dataSource.getRepository(user_entity_1.User);
        const hashedPassword = await bcrypt.hash('password123', 10);
        const user = userRepository.create({
            email: 'test@example.com',
            password: hashedPassword,
            name: 'Test User',
        });
        await userRepository.save(user);
        console.log('Test user created');
        const stationRepository = dataSource.getRepository(station_entity_1.Station);
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
        const activityRepository = dataSource.getRepository(activity_entity_1.Activity);
        for (const stationData of stations) {
            const station = stationRepository.create({
                name: stationData.name,
                isActive: true,
            });
            await stationRepository.save(station);
            console.log(`Station "${station.name}" created`);
            for (const activityData of stationData.activities) {
                const activity = activityRepository.create({
                    ...activityData,
                    station,
                });
                await activityRepository.save(activity);
                console.log(`Activity "${activity.name}" created for station "${station.name}"`);
            }
        }
        console.log('Seeder completed successfully');
    }
    catch (error) {
        console.error('Error running seeder:', error);
        throw error;
    }
    finally {
        await dataSource.destroy();
    }
}
seed().catch(console.error);
//# sourceMappingURL=seed.js.map