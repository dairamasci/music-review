const { Usuario } = require('../models');
const passport = require('passport');
// Conexión a la DB
const pool = require('../database');

const controller = {};

// Vista crear cuenta GET
controller.vistaCrearCuenta = async (req, res) => {
  res.render('crearCuenta');
};

// Crear cuenta POST
// controller.crearCuenta = passport.authenticate('local.signup', {
//   successRedirect: 'index',
//   failureRedirect: 'crearCuenta',
//   failureFlash: true
// });


// controller.crearCuenta = async (req, res) => {
  // const { body }  = req;

  // // Obtener datos del formulario
  // const usuario = new Usuario({
  //   nombreusuario: body.nombre_usuario,
  //   email: body.email,
  //   contraseña: body.contrasenia,
  //   fotoperfil: body.fotoperfil || '',
  //   id_sexo: body.sexo,
  //   fechanacimiento: body.fecha_nacimiento,
  //   administrador: body.admin === 'on' ? true : false,
  //   puntuacion: body.puntuacion || 0,
  //   vip: body.vip || '',
  // });


  // // Insertar datos en la BD - nuevo usuario
  // const user = await pool.query(
  //   'INSERT INTO `usuario` (`nombreusuario`, `email`, `contraseña`, `fotoperfil`, `id_sexo`, `fechanacimiento`, `administrador`, `puntuacion`, `vip`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
  //   [
  //     usuario.nombreusuario,
  //     usuario.email,
  //     usuario.contraseña,
  //     usuario.fotoperfil,
  //     usuario.id_sexo,
  //     usuario.fechanacimiento,
  //     usuario.administrador,
  //     usuario.puntuacion,
  //     usuario.vip
  //   ]
  // );

  // if (user) {
  //   res.render('index');
  // }
// };


// Vista perfil GET (depende de la session)
controller.vistaPerfil = async (req, res) => {
  res.render('perfil');
};


// Vista login web GET
controller.vistaLoginWeb = async (req, res) => {
  res.render('loginWeb');
};

// controller.loginWeb = async (req, res) => {
  
//   console.log(req.body);
//   res.send('received');
// }

// Vista sobre nosotros GET
controller.vistaSobreNosotros = async (req, res) => {
  res.render('sobreNosotros');
};

// Vista politicas de privacidad GET
controller.vistaPoliticasPrivacidad = async (req, res) => {
  res.render('politicaPrivacidad');
};

// Vista terminos y condiciones GET
controller.vistaTerminosCondiciones = async (req, res) => {
  res.render('terminosCondiciones');
};

// Vista terminos y condiciones GET
controller.contacto = async (req, res) => {
  res.render('contacto');
};

// Vista pasarse a vip GET
controller.vistaPasarseVip = async (req, res) => {
  res.render('pasarseVip');
};

module.exports = controller;