import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { Payload } from '../models/authModel';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface ExtendedRequest extends Request {
    info?: Payload;
}

export function verifyToken(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            console.log('No authorization header');
            return res.status(401).json({ message: 'Forbidden: No token provided' });
        }

        const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>"
        if (!token) {
            console.log('Invalid token format');
            return res.status(401).json({ message: 'Forbidden: Invalid token format' });
        }

        const decodedData = jwt.verify(token, process.env.SECRET as string) as Payload;
        req.info = decodedData;
        console.log('Decoded Data:', decodedData);

    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(500).json({ message: 'Invalid Token', error });
    }
    next();
}
