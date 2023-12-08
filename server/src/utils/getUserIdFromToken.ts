import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from './generateToken';

// METHODS TO INTERACT WITH API
export const getUserIdFromToken = (req: Request): string | null => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return null;
  }
  const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
  return decoded._id;
};
