export function CalorieCalculatorPage(req, res) {
    const user = req.user; 
       res.render('calorieCalculator', { user });
}
