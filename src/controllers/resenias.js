const { Resenia } = require('../models');

// Conexión a la DB
const pool = require('../database');
const { BADNAME } = require('dns');

const controller = {};

// Crear resenia GET vista
controller.vistaCrearResenia = async (req, res) => {
  res.render('nuevaResenia');
};

// Reseñas GET vista
controller.vistaResenias = async (req, res) => {

  // const resenia = await pool.query(
  //   'SELECT * FROM resenia'
  // );
  
  // const usuario = await pool.query(
  //   'SELECT * FROM usuario'
  // );

  const datosResenia = await pool.query(
    'SELECT r.foto_reseña, r.contenido, r.usuario_creador, r.puntuacion, r.titulo, r.id_absec, r.fecha_creacion, a.id_categoria, a.descripcion as nombre, c.descripcion as desc_categoria FROM resenia r JOIN usuario u ON r.usuario_creador = u.nombreusuario JOIN absec a ON r.id_absec = a.id_absec JOIN categoria as c ON a.id_categoria = c.id_categoria ORDER BY r.fecha_creacion DESC;'
  );
  res.render('resenias', { datosResenia });
};

// Crear resenia POST nueva reseña
controller.crearResenia = async (req, res) => {
  const { body }  = req;
  const categoria = body.categoria;
  const nombre = body.nombre;
  const date = new Date().toLocaleString();

  // Obtener datos del formulario
  const resenia = new Resenia({
    id_reseña : '',
    titulo: body.titulo, 
    fecha_creacion: date,
    usuario_creador: 'dairamasci',
    puntuacion: 0,
    id_absec: '',
    contenido: body.descripcion,
    foto_reseña: ''
  });

  let id = null;
  // var insertar_banda;
  // validamos si la banda ya existe
  const id_banda = await pool.query(
    'SELECT id_absec FROM absec WHERE descripcion = ? AND id_categoria = ?',
    [nombre, categoria],
  );

  // si existe le asignamos el id
  if (id_banda.length > 0 && id_banda[0].id_absec) {
    id = id_banda[0].id_absec;
  } else {
    // si todavía no hay id asignado, creamos la banda nueva
    id = await pool.query(
      'INSERT INTO `absec` (`descripcion`, `id_categoria`) VALUES (?, ?)',
      [nombre, categoria]
    );
    
  }
  resenia.id_absec = id;

  await pool.query(
    'INSERT INTO `resenia` (`titulo`, `fecha_creacion`, `usuario_creador`, `puntuacion`, `id_absec`, `contenido`, `foto_reseña`) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      resenia.titulo,
      resenia.fecha_creacion,
      resenia.usuario_creador,
      resenia.puntuacion,
      resenia.id_absec,
      resenia.contenido,
      resenia.foto_reseña
    ]
  );
  res.redirect('resenias');
};


module.exports = controller;