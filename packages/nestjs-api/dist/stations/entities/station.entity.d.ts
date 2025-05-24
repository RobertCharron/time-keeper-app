import { Activity } from '../../activities/entities/activity.entity';
export declare class Station {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    activities: Activity[];
}
