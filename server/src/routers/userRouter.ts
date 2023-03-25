import { Router } from 'express';
import user from '../controllers/userController';

const router = Router();
router.post('/sign-up', user.create);

export default router;