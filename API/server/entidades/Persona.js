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

  constructor(datosPersona) {
      console.log("datos: ", datosPersona)

      this.Nombre = datosPersona.Nombre
  }
}

module.exports = { Persona };
