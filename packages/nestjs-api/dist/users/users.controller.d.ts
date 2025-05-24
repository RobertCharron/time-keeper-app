import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: {
        name: string;
        email: string;
        password: string;
        role?: UserRole;
    }): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
    changeRole(id: string, role: UserRole): Promise<User>;
}
