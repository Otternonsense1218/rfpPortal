import { Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../types/index';

export async function getManagers(req: AuthRequest, res: Response, next: NextFunction) {

    try {
        const managers = await prisma.user.findMany({

            where: {
                role: {
                    in: ['MANAGER', 'MATERIALS_MANAGER', 'CFO', 'BOARD']
                },
                isActive: true,
            },
            select: { id: true, displayName: true },
        });
        res.json(managers);
    } catch (err) {
        next(err);
    }
}