import express from 'express';
import registrationController from '../controllers/registrationController.js';

const router = express.Router();

router.get('/', registrationController.RegistrationPage); 
router.post('/', registrationController.registrationController); 

export default router;
