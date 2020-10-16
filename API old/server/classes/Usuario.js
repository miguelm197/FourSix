const { Persona } = require("../entidades/Persona");
const { Generico } = require("../entidades/Genericos");
const { RegistroUsuarioResult } = require("../entidades/RegistroUsuarioResult");

const DB_Usuario = require("../dataAccess/usuario");

class Usuario extends Persona {
  Usuario;
  IdRol;
  Ci;
  Contrasena;
  Habilitado;
  Borrado;

  constructor(usuario) {
    super({
      Id: usuario.Id,
      Nombre: usuario.Nombre,
      Apellido: usuario.Apellido,
      IdEmpresa: usuario.IdEmpresa,
      Email: usuario.Email,
      Telefono: usuario.Telefono,
      Celular: usuario.Celular,
      Notas: usuario.Notas,
    });

    this.Usuario = usuario["Usuario"] || "";
    this.IdRol = usuario["IdRol"] || "";
    this.Ci = usuario["Ci"] || "";
    this.Contrasena = usuario["Contrasena"] || "";
    this.Habilitado = usuario["Habilitado"] || "";
    this.Borrado = usuario["Borrado"] || "";
  }

  async salvarUsuario() {
    let result = new Generico();

    if (this.Nombre === "") return result.set(false, 400, "Nombre es requerido");
    if (this.Apellido === "") return result.set(false, 400, "Apellido es requerido");
    if (this.Usuario === "") return result.set(false, 400, "Usuario es requerido");
    if (this.Contrasena === "") return result.set(false, 400, "Contraseña es requerida");
    if (this.Email === "") return result.set(false, 400, "Email es requerido");

    let usuarioPorUsuario = await DB_Usuario.consultaUsuarioPorUsuario(this.Usuario);
    let usuarioPorEmail = await DB_Usuario.consultaUsuarioPorEmail(this.Email);

    // Existe un usuario con el mismo usuario
    if (usuarioPorUsuario.Cant > 0) {
      result.Ok = false;
      result.Status = 400;
      result.Message = "Ya existe el usuario en el sistema.";
      return result;
    }

    // Existe un usuario con el mismo email
    if (usuarioPorEmail.Cant > 0) {
      result.Ok = false;
      result.Status = 400;
      result.Message = "Ya existe el email en el sistema.";
      return result;
    }

    try {
      let resbd = await DB_Usuario.altaUsuario(this);
      let user = new RegistroUsuarioResult(resbd.Data[0]);

      result.Extra = user;

      console.log("SE CREA USUARIO:", user);
    } catch (err) {
      result.Ok = false;
      result.Status = 400;
      result.Message = "Ha ocurrido un error al insertar un nuevo Usuario";
      return result;
    }

    return result;
  }
}

module.exports = { Usuario };
