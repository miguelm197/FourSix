const { Generico, PagedResult, PagedQuery } = require("../Entities/Genericos");
const { Proveedor } = require("../Entities/Proveedor");
const Proveedores_DAL  = require("../DataAccess/DAL_Proveedores");
const { ObtenerProveedores_Filter } = require("../DataAccess/Filters");
const { ProveedoresResult } = require("../Entities/Results/ProveedoresResult");

class Proveedores_Service {
   async obtenerProveedores(paged_query, filters) {
      let query = new PagedQuery(paged_query);
      let filtros = new ObtenerProveedores_Filter(filters);
      let pagedResult = new PagedResult();

      let desde = query.Skip;
      let hasta = query.Skip + query.Take;

      let proveedoresRetorno = [];

      let allProveedores = await Proveedores_DAL.ObtenerProveedores(query, filtros);

      allProveedores.Data.forEach((prov) => {
         let proveedor = new ProveedoresResult();

         proveedor.Codigo = prov.Codigo;
         proveedor.Nombre = prov.Nombre;
         proveedor.Direccion = prov.Direccion;
         proveedor.Telefono = prov.Telefono;
         proveedor.RUT = prov.RUT;
         proveedor.RazonSocial = prov.RazonSocial;
         proveedoresRetorno.push(proveedor);
      });

      // APLICAR PAGINADO (Desde que índice y cuantas filas retornar)
      pagedResult.Datos = proveedoresRetorno.slice(desde, hasta);

      pagedResult.CantidadFilas = proveedoresRetorno.length;
      pagedResult.FilasEnPagina = query.Take;

      return pagedResult;
   }

   altaProveedor(proveedor) {
      return new Promise((resolve) => {
         let retorno = new Generico();

         Proveedores_DAL.InsertarProveedor(proveedor).then((data) => {
            proveedor = new Proveedor(proveedor);

            if (data.Error) {
               retorno.Ok = false;
               retorno.Status = 500;
               retorno.Message = "Ha ocurrido un error al impactar en la BD";

               retorno.InfoExtra = data.Data;

               if (data.ErrorDetail) {
                  let errorBD_message = data.ErrorDetail.message;

                  if (errorBD_message.indexOf("UC_Codigo")) {
                     retorno.InfoExtra = "Ya existe un proveedor con el código: " + proveedor.Codigo;
                  }
               }
            } else {
               retorno.Message = "Proveedor '" + proveedor.Nombre + "' creado correctamente";
               retorno.Extra = proveedor;
            }

            resolve(retorno);
         });
      });
   }
}

module.exports = {
   Proveedores_Service,
};
