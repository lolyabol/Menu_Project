function checkCalorieCalculator(req, res, next) {
    if (req.user && req.user.calorieCalculatorUsed) {
        return next();
    } else {
        return res.redirect('/main/calorieCalculator'); 
    }
}

export default checkCalorieCalculator;
