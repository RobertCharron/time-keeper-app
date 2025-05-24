import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
    create(createActivityDto: CreateActivityDto): Promise<import("./entities/activity.entity").Activity>;
    findAll(): Promise<import("./entities/activity.entity").Activity[]>;
    findOne(id: string): Promise<import("./entities/activity.entity").Activity>;
    findByStation(stationId: string): Promise<import("./entities/activity.entity").Activity[]>;
}
