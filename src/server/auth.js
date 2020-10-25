module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      // si esta logueado retorna true
      return next();
    }
    return res.redirect('/loginWeb');
  }
};