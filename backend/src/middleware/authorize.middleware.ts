import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types/user";

export function authorize (roles: UserRole[]) {
        return (req: Request, res: Response, next: NextFunction) => {
                if (req.user?.role && roles.includes(req.user.role)) {
                        next()
                } else {
                        res.status(403).json({ error: 'Not authorized' });
                }
        };
};