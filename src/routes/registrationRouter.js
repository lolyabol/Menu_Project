import express from 'express';
import registrationController from '../controllers/registrationController.js';

const router = express.Router();

router.get('/', registrationController.RegistrationPage); // Отображение страницы регистрации
router.post('/', registrationController.registrationController); // Обработка формы регистрации

export default router;
