export function UserMenuPage(req, res) {
    const user = req.user; 
       res.render('userMenu', { user });
}
