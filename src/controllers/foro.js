const { Entrada } = require('../models');

// Conexión a la DB
const pool = require('../database');
const { BADNAME } = require('dns');

const controller = {};

// Home Foro get Vista
controller.vistaHomeForo = async (req, res) => {
    res.render('homeForo');
};

// Entrada get Vista
controller.vistaVerEntrada = async (req, res) => {
    res.render('entrada');
};

// Nueva Entrada get Vista
controller.vistaNuevaEntrada = async (req, res) => {
    res.render('nuevaEntrada');
};

module.exports = controller;