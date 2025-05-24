import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: {
        name: string;
        email: string;
        password: string;
        role?: UserRole;
    }): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
    changeRole(id: number, newRole: UserRole): Promise<User>;
}
