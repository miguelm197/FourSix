const { Generico } = require("../entidades/Genericos");

exports.login = (req, res) => {
  let body = req.body;
  const result = new Generico();

  if (body.usuario === "miguel") {
    result.Ok = true;
    result.Message = "Logueado correctamente";
  } else {
    result.Ok = false;
    result.Message = "Usuario o contraseña incorrecto";
    result.Status = 400;
  }

  res.status(result.Status).json(result);
};
