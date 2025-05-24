import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: User): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
            role: import("../users/entities/user.entity").UserRole;
        };
    }>;
    register(registerDto: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
            role: import("../users/entities/user.entity").UserRole;
        };
    }>;
}
