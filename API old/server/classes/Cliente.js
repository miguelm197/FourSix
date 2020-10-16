class Cliente extends Persona {
  IdPersona;
  Nota;
  Borrado;

  constructor(cliente) {
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

    this.IdPersona = usuario["IdPersona"] || "";
    this.Nota = usuario["Nota"] || "";
    this.Borrado = usuario["Borrado"] || "";
  }

  async obtenerClientes(){

    let result = new Generico();


  }






  
  
}

module.exports = { Cliente };
