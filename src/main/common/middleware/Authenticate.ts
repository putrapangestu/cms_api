import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const JWT_SECRET = 'your_secret_key';

export const Auth = (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    const token = request.cookies.jwt_token;

    if (!token) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        request.user = decoded;
        next();
    } catch (err) {
        return response.status(403).json({ message: 'Invalid token' });
    }
};

export default Auth;