const { Router } = require('express');
const express = require('express');
const passport = require('passport');
const { isLoggedIn } = require('../server/auth');
// Crear un objeto que nos permite definir url o rutas del servidor
const router = express.Router();

// controllers
const home = require('../controllers/home');
const resenias = require('../controllers/resenias');
const usuario = require('../controllers/usuarios');
// const image = require('../controllers/image');
const foro = require('../controllers/foro');

module.exports = app => {
  // home
  router.get('/', home.index);
  // traer una imagen por id
  router.get('/user/:nombreusuario', home.user);

  router.get('/nuevaResenia', isLoggedIn, resenias.vistaCrearResenia);
  router.post('/nuevaResenia', isLoggedIn, resenias.crearResenia);
  router.post('/image', resenias.imagen);

  router.get('/crearCuenta', usuario.vistaCrearCuenta);

  router.post('/crearCuenta', passport.authenticate('local.signup', {
    successRedirect: '/',
    faliureRedirect: 'crearCuenta',
    faliureFlash: true
  }));

  router.get('/perfil', isLoggedIn, usuario.vistaPerfil);

// obtener la vista
  router.get('/loginWeb', usuario.vistaLoginWeb);
// postear datos del login
  router.post('/loginWeb', (req, res, next) => {
    passport.authenticate('local.signin', {
      successRedirect: '/',
      failureRedirect: '/loginWeb',
      failureFlash: true
    })(req, res, next);
  });
  // cerrar sesion
  router.get('/cerrarSesion', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/loginWeb');
  });

  router.get('/sobreNosotros', usuario.vistaSobreNosotros);
  router.get('/politicas-de-privacidad', usuario.vistaPoliticasPrivacidad);
  router.get('/terminos-y-condiciones', usuario.vistaTerminosCondiciones);
  router.get('/contacto', usuario.contacto);

  router.get('/pasarseVip', isLoggedIn, usuario.vistaPasarseVip);
  router.post('/pasarseVip', isLoggedIn, usuario.pasarseVip);

  router.get('/resenias', resenias.vistaResenias);
  router.get('/resenias/:id', resenias.vistaVerResenia);
  
  router.post('/resenias/:id', resenias.insertarComentario);

  // Foro
  router.get('/homeForo', foro.vistaHomeForo);
  router.get('/entrada', foro.vistaVerEntrada);
  router.get('/nuevaEntrada', isLoggedIn, foro.vistaNuevaEntrada)
  app.use(router);
};
