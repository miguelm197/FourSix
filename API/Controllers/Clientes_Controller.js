const { ObtenerClientes_Filter } = require("../DataAccess/Filters");
const { Generico, Grid, PagedQuery, Sort } = require("../Entities/Genericos");

const { Clientes_Service } = require("../Services/Clientes_Service");
const Cliente = require("../Entities/Cliente");
const { ClientesResult } = require("../Entities/Results/ClientesResult");

let ObtenerClientes = async (req, res) => {
   console.log("POST - Obtener Clientes /Clientes/ObtenerClientes");

   let body = req.body;

   let grid = new Grid(req.body.grid);
   let query = new PagedQuery();

   // Guardar los filtros de la tabla
   let filtros = new ObtenerClientes_Filter();

   grid.columns.forEach((columna) => {
      if (columna.searchable) {
         filtros[columna.data] = columna.search.value;
      }
   });

   // Guardar el ordenamiento de la tabla
   query.SortOptions = new Sort(grid.columns[grid.order[0].column].data, grid.order[0].dir);

   query.Take = grid.length;
   query.Skip = grid.start;

   const srv = new Clientes_Service();
   let resp = await srv.obtenerClientes(query, filtros);
   let clientesRetorno = [];

   resp.Datos.forEach((cli) => {
      let cliente = new ClientesResult();

      cliente.Id = cli.Id;
      cliente.Nombre = cli.Nombre;
      cliente.Direccion = cli.Direccion;
      cliente.Telefono = cli.Telefono;
      cliente.RUT = cli.RUT;
      cliente.RazonSocial = cli.RazonSocial;

      clientesRetorno.push(cliente);
   });

   res.status(200).json({
      draw: grid.draw,
      recordsTotal: resp.CantidadFilas,
      recordsFiltered: resp.CantidadFilas,
      data: clientesRetorno,
   });
};

let ObtenerClientePorId = async (req, res) => {
   console.log("GET - Obtener Cliente por ID /Clientes/Id");

   let params = req.params;
   let retorno = new Generico();

   const srv = new Clientes_Service();
   retorno = await srv.obtenerClientePorId(params.id);

   console.log(retorno);
   res.json(retorno);
};

let AltaCliente = async (req, res) => {
   console.log("POST - Alta Cliente /AltaCliente");

   let body = req.body;
   let retorno = new Generico();

   const srv = new Clientes_Service();
   retorno = await srv.altaCliente(body);

   console.log(retorno.Message);
   console.log(retorno.InfoExtra);

   res.json(retorno);
};

let EditarCliente = async (req, res) => {
   console.log("PUT - Editar Cliente /EditarCliente");

   let params = req.params;
   let body = req.body;
   let retorno = new Generico();

   const srv = new Clientes_Service();
   retorno = await srv.editarCliente(params.id, body);

   console.log(retorno.Message);
   console.log(retorno.InfoExtra);

   res.json(retorno);
};

let BajaCliente = async (req, res) => {
   console.log("DELETE - Baja Cliente /BajaCliente");

   let params = req.params;
   let retorno = new Generico();

   const srv = new Clientes_Service();
   retorno = await srv.bajaCliente(params.id);

   console.log(retorno.Message);
   console.log(retorno.InfoExtra);

   res.json(retorno);
};

module.exports = { ObtenerClientes, ObtenerClientePorId, AltaCliente, EditarCliente, BajaCliente };
