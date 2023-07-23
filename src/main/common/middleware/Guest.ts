import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const Guest = (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    const token = request.cookies.jwt_token;
    if (token) {
        return response.status(401).json({ message: 'You have logged' });
    }

    next();
};

export default Guest;