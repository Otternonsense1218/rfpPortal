import { Request } from 'express';
import { Role } from '@prisma/client';

export interface JwtPayload {
  userId: number;
  role: Role;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
