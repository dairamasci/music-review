class Usuario {
  constructor (props) {
    this.nombreusuario = props.nombreusuario;
    this.email = props.email;
    this.contraseña = props.contraseña;
    this.fotoperfil = props.fotoperfil;
    this.id_sexo = props.id_sexo;
    this.fechanacimiento = props.fechanacimiento;
    this.administrador = props.administrador;
    this.puntuacion = props.puntuacion;
    this.vip = props.vip;
    this.rango = props.rango;
  }

  getName() {
    return this.nombreusuario;
  }
}

module.exports = Usuario;