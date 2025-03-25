import { registerUser } from '../services/registrationService.js';

function RegistrationPage(req, res) {
    res.render('registration'); 
}

const registrationController = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const message = await registerUser(username, email, password);
        res.render('login', { message }); 
    } catch (error) {
        res.render('registration', { error: error.message });
    }
};

export default {
    RegistrationPage,
    registrationController
};
