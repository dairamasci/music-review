const { Usuario, Comentario } = require('../models');

// Conexión a la DB
const pool = require('../database');
// const sidebar = require('../helpers/sidebar');

const controller = {};

controller.index = async (req, res) => {

  const resenias = await pool.query(
    'SELECT r.foto_reseña, r.contenido, r.usuario_creador, r.puntuacion, r.titulo, r.id_absec, r.fecha_creacion, a.id_categoria, a.descripcion as nombre, c.descripcion as desc_categoria, u.rango FROM resenia r JOIN usuario u ON r.usuario_creador = u.nombreusuario JOIN absec a ON r.id_absec = a.id_absec JOIN categoria as c ON a.id_categoria = c.id_categoria WHERE r.puntuacion = (SELECT MAX(puntuacion) FROM resenia) ORDER BY r.fecha_creacion DESC LIMIT 2 ;'
  );
  const datosResenias = resenias.map((item, key) => ({ ...item, key }));
  res.render('index', { datosResenias });

  // res.render('index');
};

controller.user = async (req, res) => {
  const { body } = req.params;
  // links va a ser un arreglo, y yo necesito el primer objeto de este arreglo
  const user = await pool.query('SELECT * FROM usuario WHERE nombreusuario = ?', [nombreusuario]);
  res.send(user);
}

module.exports = controller;