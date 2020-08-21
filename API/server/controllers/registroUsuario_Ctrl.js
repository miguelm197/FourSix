const { Generico } = require("../entidades/Genericos");
const { Persona } = require("../entidades/Persona");

exports.registroUsuario = (req, res) => {
  let body = req.body;
  const result = new Generico();

  const persona = new Persona({Nombre:"Miguel"});

  console.log(persona);


  
  res.status(result.Status).json(result);
};
