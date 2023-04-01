import { Router } from 'express';
import user from '../controllers/userController';

const router = Router();
router.post('/sign-up', user.create);
router.get('/sign-in', user.logIn);

export default router;