import { Router } from 'express';
import user from 'controllers/userController';
import authMiddleware from 'middlewares/authMiddleware';

const router = Router();
router.post('/sign-up', user.create);
router.post('/sign-in', user.logIn);
router.post('/sign-out', user.logOut);
router.post('/auth', authMiddleware, user.updateToken);

export default router;