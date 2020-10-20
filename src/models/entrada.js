class Entrada {
  constructor (props) {
    this.id_entrada = props.id_entrada;
    this.puntaje = props.puntaje;
    this.titulo = props.titulo;
    this.foto_entrada = props.foto_entrada;
    this.fecha_creacion = props.fecha_creacion;
    this.usuario_creador = props.usuario_creador;
    this.cuerpo = props.cuerpo;
    this.id_categoria = props.id_categoria;
  }
}

module.exports = Entrada;