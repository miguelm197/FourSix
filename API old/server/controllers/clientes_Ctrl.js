const { Generico } = require("../entidades/Genericos");

exports.registroUsuario = async (req, res) => {

    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;

    let result = new Generico();

    

}