const { Resenia } = require('../models');

// Conexión a la DB
const pool = require('../database');
const { BADNAME } = require('dns');
const { user } = require('./home');

const controller = {};

// Crear resenia GET vista
controller.vistaCrearResenia = async (req, res) => {
  res.render('nuevaResenia');
};

// Ver resenia GET vista
controller.vistaVerResenia = async (req, res) => {
  let publicidad = true;
  
  const datosResenia = await pool.query(
    'SELECT r.id_reseña, r.foto_reseña, r.contenido, r.usuario_creador, r.puntuacion, r.titulo, r.id_absec, r.fecha_creacion, a.id_categoria, a.descripcion as nombre, c.descripcion as desc_categoria, u.rango FROM resenia r JOIN usuario u ON r.usuario_creador = u.nombreusuario JOIN absec a ON r.id_absec = a.id_absec JOIN categoria as c ON a.id_categoria = c.id_categoria WHERE r.id_reseña = ?',
    [req.params.id],
  );
  
  const comentarios = await pool.query(
    'SELECT c.id_comentario, c.fecha_comentario, c.usuario_creador, c.puntuacion as puntuacion_comentario, c.contenido, u.puntuacion as puntuacion_usuario, u.vip, u.rango FROM comentario as c JOIN `resenia-comentario` as rc ON c.id_comentario = rc.id_comentario JOIN usuario as u ON c.usuario_creador = u.nombreusuario WHERE rc.id_reseña = ?',
    [req.params.id],
  );
  

  if ((req.user.rango == 'Vip') || (req.user.rango == 'Confiable')) {
    publicidad = false;
  } else {
    publicidad = true;
  }

  res.render('ver-resenia', { datosResenia: datosResenia[0], comentarios });
}

// Reseñas GET vista
controller.vistaResenias = async (req, res) => {
  let publicidad = true;
  const datosResenia = await pool.query(
    'SELECT r.id_reseña, r.foto_reseña, r.contenido, r.usuario_creador, r.puntuacion, r.titulo, r.id_absec, r.fecha_creacion, a.id_categoria, a.descripcion as nombre, c.descripcion as desc_categoria, u.rango FROM resenia r JOIN usuario u ON r.usuario_creador = u.nombreusuario JOIN absec a ON r.id_absec = a.id_absec JOIN categoria as c ON a.id_categoria = c.id_categoria ORDER BY r.fecha_creacion DESC;'
  );
  
  if ((req.user.rango == 'Vip') || (req.user.rango == 'Confiable')) {
    publicidad = false;
  } else {
    publicidad = true;
  }

  res.render('resenias', { datosResenia, publicidad });
};

// Comentario reseña POST
controller.insertarComentario = async (req, res, next) => {
  const date = new Date().toLocaleString();

  id = await pool.query(
    'INSERT INTO  `resenia-comentario` (`id_reseña`) VALUES (?)',
    [ req.params.id ],
  );
  
  await pool.query(
    'INSERT INTO  `comentario` (`id_comentario`, `fecha_comentario`, `usuario_creador`, `puntuacion`, `contenido`) VALUES (?, ?, ?, ?, ?)',
    [id.insertId, date, req.user.nombreusuario, 0, req.body.comentario],
  );

  comentario_nuevo = await pool.query(
    'SELECT c.id_comentario, c.fecha_comentario, c.usuario_creador, c.puntuacion as puntuacion_comentario, c.contenido, u.puntuacion as puntuacion_usuario, u.vip, u.rango FROM comentario as c JOIN `resenia-comentario` as rc ON c.id_comentario = rc.id_comentario JOIN usuario as u ON c.usuario_creador = u.nombreusuario WHERE rc.id_reseña = ? AND c.id_comentario = ?',
    [ req.params.id, id.insertId],
  );

  console.log(comentario_nuevo)
  
  res.json({ comentario_nuevo });
}

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