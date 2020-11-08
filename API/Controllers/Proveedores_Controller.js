const { Generico, Grid, PagedQuery, Sort } = require("../Entities/Genericos");
const { Proveedores_Service } = require("../Services/Proveedores_Service");
const { ProveedoresFilter } = require("../Entities/Filters/ProveedoresFilter");
const { ProveedoresResult } = require("../Entities/Results/ProveedoresResult");

let ObtenerProveedores = async (req, res) => {
   console.log("POST - Obtener Proveedores /ObtenerProveedores");

   let body = req.body;

   let grid = new Grid(req.body.grid);
   let query = new PagedQuery();

   // Guardar los filtros de la tabla
   let filtros = new ProveedoresFilter();

   grid.columns.forEach((columna) => {
      if (columna.searchable) {
         filtros[columna.data] = columna.search.value;
      }
   });

   // Guardar el ordenamiento de la tabla
   query.SortOptions = new Sort(grid.columns[grid.order[0].column].data, grid.order[0].dir);

   query.Take = grid.length;
   query.Skip = grid.start;

   const srv = new Proveedores_Service();
   let resp = await srv.obtenerProveedores(query, filtros);
   let data = [];

   resp.Datos.forEach((proveedor) => {
      let prov = new ProveedoresResult();

      prov.Id = proveedor.Id;
      prov.Codigo = proveedor.Codigo;
      prov.Nombre = proveedor.Nombre;
      prov.Direccion = proveedor.Direccion;
      prov.Telefono = proveedor.Telefono;
      prov.RUT = proveedor.RUT;
      prov.RazonSocial = proveedor.RazonSocial;

      data.push(prov);
   });

   res.status(200).json({
      draw: grid.draw,
      recordsTotal: resp.CantidadFilas,
      recordsFiltered: resp.CantidadFilas,
      data: data,
   });
};

let ObtenerProveedorPorId = async (req, res) => {
   console.log("GET - Obtener Cliente por ID /Proveedor/Id");

   let params = req.params;
   let retorno = new Generico();

   const srv = new Proveedores_Service();
   retorno = await srv.obtenerProveedorPorId(params.id);

   console.log(retorno);
   res.json(retorno);
};

let AltaProveedor = async (req, res) => {
   console.log("POST - Alta Proveedor /AltaProveedor");

   let body = req.body;
   let retorno = new Generico();

   const srv = new Proveedores_Service();
   retorno = await srv.altaProveedor(body);

   console.log(retorno.Message);
   console.log(retorno.InfoExtra);

   res.json(retorno);
};

let EditarProveedor = async (req, res) => {
   console.log("PUT - Editar Proveedor /EditarProveedor");

   let params = req.params;
   let body = req.body;
   let retorno = new Generico();

   const srv = new Proveedores_Service();
   retorno = await srv.editarProveedor(params.id, body);

   console.log(retorno.Message);
   console.log(retorno.InfoExtra);

   res.json(retorno);
};

module.exports = { AltaProveedor, ObtenerProveedores, ObtenerProveedorPorId, EditarProveedor };
