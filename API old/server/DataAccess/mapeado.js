class PERSONA {
  Nombre;
  Apellido;
  IdEmpresa;
  Email;
  Telefono;
  Celular;
  Notas;
  Borrado;

  constructor(persona) {
    this.Id = persona["Id"] || "";
    this.Nombre = persona["Nombre"] || "";
    this.Apellido = persona["Apellido"] || "";
    this.IdEmpresa = persona["IdEmpresa"] || "";
    this.Email = persona["Email"] || "";
    this.Telefono = persona["Telefono"] || "";
    this.Celular = persona["Celular"] || "";
    this.Notas = persona["Notas"] || "";
    this.Borrado = persona["Borrado"] || "";
  }
}

class USUARIO {
  IdPersona;
  Usuario;
  IdRol;
  Ci;
  Contrasena;
  Habilitado;
  Borrado;

  constructor(persona) {
    this.IdPersona = persona["IdPersona"] || "";
    this.Usuario = persona["Usuario"] || "";
    this.idRol = persona["idRol"] || "";
    this.Ci = persona["Ci"] || "";
    this.Contrasena = persona["Contrasena"] || "";
    this.Habilitado = persona["Habilitado"] || "";
    this.Borrado = persona["Borrado"] || "";
  }
}

module.exports = { PERSONA, USUARIO };
