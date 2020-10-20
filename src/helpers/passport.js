const passport = require('passport');
const { valid } = require('semver');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const { Usuario } = require('../models');

const password = require('./password');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'contrasenia',
  passReqToCallback: true
}, async (req, email, contrasenia, done) => {
  console.log('local.signim', email, contrasenia);
  // Consulto en la BBDD si existe el usuario
  const rows = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
  console.log(req.body);
  // Si existe el usuario
  if (rows.length > 0) {
    const user = rows[0];
    // Valido si la password introducida coincide con la almacenada en la BBDD
    const validPassword = await password.matchPassword(contrasenia, user.contraseña);
    console.log(contrasenia, user.contraseña);
    if (validPassword) {
      console.log(validPassword);
    } else {
      console.log('no validpassword');
    }
    // if (validPassword) {
      // done(null, user, req.flash('success', 'Welcome ' + user.nombreusuario));
    // } else {
      // done(null, false, req.flash('message', 'Incorrect password'));
    // }
  // } else {
    // return done(null, false, req.flash('message','The username does not exists'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'contrasenia',
  passReqToCallback: true,
}, async (req, email, contrasenia, done) => {
  const { body }  = req;

  const usuario = new Usuario({
    nombreusuario: body.nombre_usuario,
    email: body.email,
    fotoperfil: body.fotoperfil || '',
    id_sexo: body.sexo,
    fechanacimiento: body.fecha_nacimiento,
    administrador: body.admin === 'on' ? true : false,
    puntuacion: body.puntuacion || 0,
    vip: body.vip || '',
  });
  // Encripto password antes de almacenarla en la BBDD
  usuario.contraseña = await password.encryptPassword(body.contrasenia);
  // console.log(usuario);
  // Insertar datos en la BD - nuevo usuario
  const user = await pool.query(
    'INSERT INTO `usuario` (`nombreusuario`, `email`, `contraseña`, `fotoperfil`, `id_sexo`, `fechanacimiento`, `administrador`, `puntuacion`, `vip`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      usuario.nombreusuario,
      usuario.email,
      usuario.contraseña,
      usuario.fotoperfil,
      usuario.id_sexo,
      usuario.fechanacimiento,
      usuario.administrador,
      usuario.puntuacion,
      usuario.vip
    ]
  );
  console.log(user);
  user.nombreusuario = usuario.nombreusuario;
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.nombreusuario);
});

passport.deserializeUser(async (nombreusuario, done) => {
  const rows = await pool.query('SELECT * from usuario WHERE nombreusuario = ?', [nombreusuario]);
  done(null, rows[0]);
});

