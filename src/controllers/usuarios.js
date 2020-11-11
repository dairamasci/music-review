const { Usuario } = require('../models');
const passport = require('passport');
// Conexión a la DB
const pool = require('../database');

const { user } = require('./home');

const controller = {};

// Vista crear cuenta GET
controller.vistaCrearCuenta = async (req, res) => {
  res.render('crearCuenta');
};

// Vista perfil GET (depende de la session)
controller.vistaPerfil = async (req, res) => {
  res.render('perfil');
};

// Vista login web GET
controller.vistaLoginWeb = async (req, res) => {
  res.render('loginWeb');
};

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

// Vista pasarse a vip GET
controller.pasarseVip = async (req, res) => {
  console.log(req.user.nombreusuario)
  await pool.query(
    "UPDATE `usuario` SET `vip` = '1' WHERE `usuario`.`nombreusuario` = ?",
    [req.user.nombreusuario],
  );
  req.flash('success', 'Te pasaste a VIP! gracias! :)');
  res.render('index');
};

module.exports = controller;