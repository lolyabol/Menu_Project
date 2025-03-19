import { registerUser } from '../services/registrationService.js';

function showRegistrationPage(req, res) {
    res.render('registration'); 
}

const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const message = await registerUser(username, email, password);
        res.render('login', { message }); 
    } catch (error) {
        res.render('registration', { error: error.message });
    }
};

export default {
    showRegistrationPage,
    registerController
};
