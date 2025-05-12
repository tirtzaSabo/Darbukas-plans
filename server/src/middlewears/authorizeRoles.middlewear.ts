import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user?: { role?: string };
}

export const authorizeRoles=(...allowedRoles: string[])=> {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        const userRole = req.user?.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        next();
    };
}
