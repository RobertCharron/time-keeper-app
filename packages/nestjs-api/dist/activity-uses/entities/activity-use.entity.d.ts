import { Activity } from '../../activities/entities/activity.entity';
import { User } from '../../users/entities/user.entity';
export declare class ActivityUse {
    id: number;
    timeStart: Date;
    timeEnd: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: number;
    activity: Activity;
    activityId: number;
}
