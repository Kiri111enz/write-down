import { Router } from 'express';
import user from 'controllers/userController';
import auth from 'middlewares/authMiddleware';

const router = Router();
router.post('/sign-up', user.create);
router.post('/sign-in', user.signIn);
router.post('/sign-out', user.signOut);
router.post('/auth', auth, user.updateToken);

export default router;