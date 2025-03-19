import express from 'express';
import { registerController } from '../controllers/registrationController.js';

const router = express.Router();

router.post('/', registerController);

export default router;
