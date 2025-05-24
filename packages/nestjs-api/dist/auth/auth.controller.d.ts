import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
            role: import("../entities/user.entity").UserRole;
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
            role: import("../entities/user.entity").UserRole;
        };
    }>;
}
