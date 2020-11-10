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

  // Consulto en la BBDD si existe el usuarios
  const rows = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]); 
  // Si existe el usuario
  if (rows.length > 0) {
    const user = rows[0];

    // Valido si la password introducida coincide con la almacenada en la BBDD
    const validPassword = await password.matchPassword(contrasenia, user.contraseña);
    if (validPassword) {
      done(null, user);
    } else {
      done(null, false, req.flash('message', 'Contraseña incorrecta.'));
    }
  } else {
    return done(null, false, req.flash('message','No existen usuarios registrados para el email proporcionado.'));
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
    rango: 'Básico',
  });
  // Encripto password antes de almacenarla en la BBDD
  usuario.contraseña = await password.encryptPassword(body.contrasenia);
  // console.log(usuario);
  // Insertar datos en la BD - nuevo usuario
  const user = await pool.query(
    'INSERT INTO `usuario` (`nombreusuario`, `email`, `contraseña`, `fotoperfil`, `id_sexo`, `fechanacimiento`, `administrador`, `puntuacion`, `vip`, `rango`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      usuario.nombreusuario,
      usuario.email,
      usuario.contraseña,
      usuario.fotoperfil,
      usuario.id_sexo,
      usuario.fechanacimiento,
      usuario.administrador,
      usuario.puntuacion,
      usuario.vip,
      usuario.rango
    ]
  );
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