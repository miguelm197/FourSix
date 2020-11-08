const { Generico, PagedResult, PagedQuery } = require("../Entities/Genericos");
const { Proveedor } = require("../Entities/Proveedor");
const Proveedores_DAL = require("../DataAccess/DAL_Proveedores");
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

         proveedor.Id = prov.Id;
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

   async obtenerProveedorPorId(idProveedor) {
      let retorno = new Generico();

      let resBD = await Proveedores_DAL.ObtenerProveedorPorId(idProveedor);

      if (resBD.Error) {
         return retorno.set(false, 500, resBD.Message);
      }

      if (resBD.Data.length == 0) {
         return retorno.set(false, 400, "No se encontró un proveedor con id " + idProveedor);
      }

      let proveedoresRetorno = [];

      resBD.Data.forEach((prov) => {
         let proveedor = new ProveedoresResult();

         proveedor.Id = prov.Id;
         proveedor.Codigo = prov.Codigo;
         proveedor.Nombre = prov.Nombre;
         proveedor.Direccion = prov.Direccion;
         proveedor.Telefono = prov.Telefono;
         proveedor.Rut = prov.RUT;
         proveedor.RazonSocial = prov.RazonSocial;
         proveedor.Activo = prov.Activo;

         proveedoresRetorno.push(proveedor);
      });

      retorno.Data = proveedoresRetorno;

      return retorno;
   }

   async altaProveedor(proveedor) {
      let retorno = new Generico();
      proveedor = new Proveedor(proveedor);

      let data = await Proveedores_DAL.InsertarProveedor(proveedor);

      if (data.Error) {
         retorno.Ok = false;
         retorno.Status = 500;
         retorno.Message = "Ha ocurrido un error al impactar";

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

      return retorno;
   }

   async editarProveedor(id, proveedor) {
      let retorno = new Generico();
      proveedor = new Proveedor(proveedor);

      let data = await Proveedores_DAL.EditarProveedor(id, proveedor);

      if (data.Error) {
         retorno.Ok = false;
         retorno.Status = 500;
         retorno.Message = "Ha ocurrido un error al impactar";

         retorno.InfoExtra = data.Data;
         // console.log("INFO EXTRA", data);
         if (data.ErrorDetail) {
            let errorBD_message = data.ErrorDetail.message;

            if (errorBD_message.indexOf("UC_Codigo")) {
               retorno.InfoExtra = "Ya existe un proveedor con el código: " + proveedor.Codigo;
            }
         }
      } else {
         console.log(proveedor);
         retorno.Message = "Proveedor '" + proveedor.Nombre + "' editado correctamente";
         retorno.Extra = proveedor;
      }

      return retorno;
   }
}

module.exports = {
   Proveedores_Service,
};
