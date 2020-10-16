class RegistroUsuarioResult {
  Id;
  Nombre;
  Apellido;
  Usuario;
  IdRol;
  Email;

  constructor(usuario) {
    this.Id = usuario["Id"] || "";
    this.Nombre = usuario["Nombre"] || "";
    this.Apellido = usuario["Apellido"] || "";
    this.Usuario = usuario["Usuario"] || "";
    this.IdRol = usuario["IdRol"] || "";
    this.Email = usuario["Email"] || "";
  }
}

module.exports = { RegistroUsuarioResult };
