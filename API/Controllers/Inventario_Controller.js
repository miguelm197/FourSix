const { Generico } = require("../Entities/Genericos");
const { Inventario_Service } = require("../Services/Inventario_Service");

let AltaInventario = async (req, res) => {
   console.log("POST - Alta inventario /inventario/alta\n");

   let body = req.body;
   let retorno = new Generico();

   const srv = new Inventario_Service();
   retorno = await srv.altaInventario(body);

   console.log(retorno.Message);

   res.json(retorno);
};

module.exports = { AltaInventario };
