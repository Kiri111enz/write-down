import { Router } from "express";
import * as note from 'controllers/noteController';

const router = Router();
router.get('/get', note.get);
router.post('/create', note.create);
router.post('/change', note.change);
router.delete('/delete', note.destroy);

export default router;