import { Router } from 'express';
import { createRequest } from '../controllers/requests.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/', requireAuth, createRequest);

export default router;