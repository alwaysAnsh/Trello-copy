import express from 'express'
import { login, signup, test } from '../controller/auth.controller.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();



router.post('/login', login);
router.post('/signup', signup );
router.get('/test',test)

export default router;