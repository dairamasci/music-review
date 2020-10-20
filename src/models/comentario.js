class Comentario {
  constructor (props) {
    this.id_comentario = props.id_comentario;
    this.fecha_comentario = props.fecha_comentario;
    this.usuario_creador = props.usuario_creador;
    this.puntuacion = props.puntuacion;
    this.contenido = props.contenido;
  }
}

module.exports = Comentario;