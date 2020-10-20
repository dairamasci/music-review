class Resenia {
  constructor (props) {
    this.id_reseña = props.id_reseña;
    this.titulo = props.titulo;
    this.fecha_creacion = props.fecha_creacion;
    this.usuario_creador = props.usuario_creador;
    this.puntuacion = props.puntuacion;
    this.id_absec = props.id_absec;
    this.contenido = props.contenido;
    this.foto_reseña = props.foto_reseña;
  }
}

module.exports = Resenia;