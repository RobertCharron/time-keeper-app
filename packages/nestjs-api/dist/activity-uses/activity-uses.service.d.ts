import { Repository } from 'typeorm';
import { ActivityUse } from './entities/activity-use.entity';
import { CreateActivityUseDto } from './dto/create-activity-use.dto';
export declare class ActivityUsesService {
    private activityUsesRepository;
    constructor(activityUsesRepository: Repository<ActivityUse>);
    create(createActivityUseDto: CreateActivityUseDto, userId: number): Promise<ActivityUse>;
    findAll(): Promise<ActivityUse[]>;
    findOne(id: number): Promise<ActivityUse>;
    findByUser(userId: number): Promise<ActivityUse[]>;
    findByActivity(activityId: number): Promise<ActivityUse[]>;
    endActivity(id: number): Promise<ActivityUse>;
}
