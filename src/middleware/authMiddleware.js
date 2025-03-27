export const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login'); // Перенаправление на страницу входа, если пользователь не авторизован
};
