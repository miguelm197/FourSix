const { Generico } = require("../entidades/Genericos");
const { Proveedores_Service } = require("../Services/Proveedores_Service");

let AltaProveedor = async (req, res) =>{
    let body = req.body;
    let retorno = new Generico();
    
    const srv = new Proveedores_Service();
    retorno = await srv.altaProveedor(body);

    res.json(retorno);
}

module.exports = { AltaProveedor };


