class Persona {
  Id;
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

module.exports = { Persona };
