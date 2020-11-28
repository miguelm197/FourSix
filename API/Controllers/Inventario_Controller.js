const { Generico } = require("../Entities/Genericos");
const { Inventario_Service } = require("../Services/Inventario_Service");

let AltaInventario = async (req, res) => {
   console.log("POST - Alta inventario /inventario/alta\n");

   let body = req.body;
   let retorno = new Generico();

   const srv = new Inventario_Service();
   retorno = await srv.altaInventario(body);

   console.log(retorno.Message);

   res.status(retorno.Status).json(retorno);
};

let ObtenerInventarioPorId = async (req, res) => {
   console.log("GET - Obtener Inventario por ID /inventario/:Id \n");

   let params = req.params;
   let retorno = new Generico();

   const srv = new Inventario_Service();
   retorno = await srv.obtenerInventarioPorId(params.id);

   console.log(retorno);
   res.status(retorno.Status).json(retorno);
};

module.exports = { ObtenerInventarioPorId, AltaInventario };
