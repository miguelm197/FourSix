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

module.exports = { AltaCliente, ObtenerClientes };
