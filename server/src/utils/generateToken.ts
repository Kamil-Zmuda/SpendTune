import jwt, { Secret } from 'jsonwebtoken';
import { TUser } from '../@types';

const EXPIRES_IN = '2days';

export const SECRET_KEY: Secret = process.env.JWT_SECRET_KEY || 'jwt-secret';
export const generateToken = (user: TUser) => {
  const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
    expiresIn: EXPIRES_IN,
  });
  return token;
};
