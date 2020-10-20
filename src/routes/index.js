const { Router } = require('express');
const express = require('express');
const passport = require('passport');
// Crear un objeto que nos permite definir url o rutas del servidor
const router = express.Router();

// controllers
const home = require('../controllers/home');
const resenias = require('../controllers/resenias');
const usuario = require('../controllers/usuarios');
// const image = require('../controllers/image');

module.exports = app => {
  // home
  router.get('/', home.index);
  // traer una imagen por id
  router.get('/user/:nombreusuario', home.user);
  // // subir una imagen
  // router.post('/usuario', usuario.crear);
  // // dar like a una imagen
  // router.post('/images/:image_id/like', image.like);
  // // comentar en una imagen
  // router.post('/images/:image_id/comment', image.comment);
  // // eliminar una imagen
  // router.delete('/images/:image_id', image.remove);
  router.get('/nuevaResenia', resenias.vistaCrearResenia);
  router.post('/nuevaResenia', resenias.crearResenia)

  router.get('/crearCuenta', usuario.vistaCrearCuenta);

  // router.post('/crearCuenta', usuario.crearCuenta);

  router.post('/crearCuenta', passport.authenticate('local.signup', {
    successRedirect: '/',
    faliureRedirect: 'crearCuenta',
    faliureFlash: true
  }));


  router.get('/perfil', usuario.vistaPerfil);


  router.get('/loginWeb', usuario.vistaLoginWeb);
  router.post('/loginWeb', (req, res, next) => {
    passport.authenticate('local.signin', {
      successRedirect: '/',
      faliureRedirect: '/loginWeb',
      faliureFlash: true
    })(req, res, next);
  })

  router.get('/sobreNosotros', usuario.vistaSobreNosotros);
  router.get('/politicas-de-privacidad', usuario.vistaPoliticasPrivacidad);
  router.get('/terminos-y-condiciones', usuario.vistaTerminosCondiciones);
  router.get('/contacto', usuario.contacto);

  router.get('/pasarseVip', usuario.vistaPasarseVip);

  router.get('/resenias', resenias.vistaResenias);

  app.use(router);
};
