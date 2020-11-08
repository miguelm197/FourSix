const { Generico } = require("../Entities/Genericos");
const { Clientes_Service } = require("../Services/Clientes_Service");

let ObtenerClientes = async (req, res) => {
   console.log("GET - Obtener Clientes /ObtenerClientes");

   let body = req.body;
   let retorno = new Generico();

   const srv = new Clientes_Service();
   retorno = await srv.obtenerClientes(body);

   console.log(retorno.Message);
   console.log(retorno.InfoExtra);

   res.json(retorno);
};

let ObtenerClientePorId = async (req, res) => {
   console.log("GET - Obtener Cliente por ID /ObtenerClientes/Id");

   let params = req.params;
   let body = req.body;
   let retorno = new Generico();

   const srv = new Clientes_Service();

   if (!params.id) {
      retorno.set(False, 400, "El id del proveedor es requerido.");
   } else {
      retorno = await srv.ObtenerClientePorId(params.id);

      console.log(retorno.Message);
      console.log(retorno.InfoExtra);
   }
   res.json(retorno);
};

let AltaCliente = async (req, res) => {
   console.log("POST - AltaCliente /AltaCliente");

   let body = req.body;
   let retorno = new Generico();

   const srv = new Clientes_Service();
   retorno = await srv.altaCliente(body);

   console.log(retorno.Message);
   console.log(retorno.InfoExtra);

   res.json(retorno);
};

module.exports = { AltaCliente, ObtenerClientes, ObtenerClientePorId };
