import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types/user';

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: number;
            role: UserRole;
        };
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: 'Not authenticated' });
    }
}
