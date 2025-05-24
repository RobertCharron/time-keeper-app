import { ActivityUsesService } from './activity-uses.service';
import { CreateActivityUseDto } from './dto/create-activity-use.dto';
export declare class ActivityUsesController {
    private readonly activityUsesService;
    constructor(activityUsesService: ActivityUsesService);
    create(createActivityUseDto: CreateActivityUseDto, req: any): Promise<import("./entities/activity-use.entity").ActivityUse>;
    findAll(): Promise<import("./entities/activity-use.entity").ActivityUse[]>;
    findOne(id: string): Promise<import("./entities/activity-use.entity").ActivityUse>;
    findByUser(userId: string): Promise<import("./entities/activity-use.entity").ActivityUse[]>;
    findByActivity(activityId: string): Promise<import("./entities/activity-use.entity").ActivityUse[]>;
    endActivity(id: string): Promise<import("./entities/activity-use.entity").ActivityUse>;
}
