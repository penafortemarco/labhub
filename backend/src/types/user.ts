export type UserRole = 'regular' | 'admin';

export interface User {
        id: number;
        created_at: Date;
        username: string;
        password: string;
        role: UserRole;
}