import { Station } from '../../stations/entities/station.entity';
import { ActivityUse } from '../../activity-uses/entities/activity-use.entity';
export declare class Activity {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    station: Station;
    stationId: number;
    activityUses: ActivityUse[];
}
