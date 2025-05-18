import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user?: { role?: string };
}

export const authorizeRoles=(...allowedRoles: string[])=> {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        const userRole = req.body.user?.role;
        console.log(userRole);
        
        if (!userRole || !allowedRoles.includes(userRole)) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        next();
    };
}
