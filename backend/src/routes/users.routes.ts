import { Router } from 'express';
import { getManagers } from '../controllers/users.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/managers', requireAuth, getManagers);

export default router;