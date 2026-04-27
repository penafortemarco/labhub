import { UserRole } from "./user";

declare global {
        namespace Express {
                interface Request {
                        user?: {
                                id: number;
                                role: UserRole;
                        };
                }
        }
}

export {};