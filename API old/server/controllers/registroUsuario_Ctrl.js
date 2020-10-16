const { Generico } = require("../entidades/Genericos");
const { Usuario } = require("../classes/Usuario");

let registroUsuario = async (req, res) => {
  let body = req.body;
  let result = new Generico();

  const usuario = new Usuario(body);

  let resp = await usuario.salvarUsuario();

  result = resp;

  res.status(resp.Status).json(result);
};

module.exports = { registroUsuario };
