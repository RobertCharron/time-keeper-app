import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
export declare class ActivitiesService {
    private activitiesRepository;
    constructor(activitiesRepository: Repository<Activity>);
    create(createActivityDto: CreateActivityDto): Promise<Activity>;
    findAll(): Promise<Activity[]>;
    findOne(id: number): Promise<Activity>;
    findByStation(stationId: number): Promise<Activity[]>;
}
