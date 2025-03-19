
export const showAboutPage = (req, res) => {
    console.log("Отображение страницы 'О нас'");
    res.render('about'); // Предположим, у вас есть шаблон 'about.hbs'
};

