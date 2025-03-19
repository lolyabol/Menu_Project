import express from 'express';
import { showLoginPage, handleLogin } from '../controllers/loginController.js';

const router = express.Router();

router.get('/', showLoginPage);

router.post('/', handleLogin);

export default router;
