import { ActivityUse } from 'src/activity-uses/entities/activity-use.entity';
export declare enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    USER = "user"
}
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    activityUses: ActivityUse[];
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
