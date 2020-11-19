const { Generico } = require("../Entities/Genericos");
const { Cliente } = require("../Entities/Cliente");
const Clientes_DAL = require("../DataAccess/DAL_Clientes");
const { ObtenerClientes_Filter } = require("../DataAccess/Filters");
const { ClientesResult } = require("../Entities/Results/ClientesResult");

class Clientes_Service {
   async obtenerClientes(paged_query, filters) {
      let query = new PagedQuery(paged_query);
      let filtros = new ObtenerClientes_Filter(filters);
      let pagedResult = new PagedResult();

      let desde = query.Skip;
      let hasta = query.Skip + query.Take;

      let clientesRetorno = [];

      let allClientes = await Clientes_DAL.ObtenerClientes(query, filtros);

      allClientes.Data.forEach((cli) => {
         let cliente = new ClientesResult();

         cliente.Id = cli.Id;
         cliente.Nombre = cli.Nombre;
         cliente.Direccion = cli.Direccion;
         cliente.Telefono = cli.Telefono;
         cliente.RUT = cli.RUT;
         cliente.RazonSocial = cli.RazonSocial;

         clientesRetorno.push(cliente);
      });

      // APLICAR PAGINADO (Desde que índice y cuantas filas retornar)
      pagedResult.Datos = clientesRetorno.slice(desde, hasta);

      pagedResult.CantidadFilas = clientesRetorno.length;
      pagedResult.FilasEnPagina = query.Take;

      return pagedResult;
   }

   async obtenerClientePorId(idCliente) {
      let retorno = new Generico();

      let resBD = await Clientes_DAL.ObtenerClientePorId(idCliente);

      if (resBD.Error) {
         return retorno.set(false, 500, resBD.Message);
      }

      if (resBD.Data.length == 0) {
         return retorno.set(false, 400, "No se encontró un cliente con id " + idCliente);
      }

      let clientesRetorno = [];

      resBD.Data.forEach((cli) => {
         let cliente = new ClientesResult();

         cliente.Id = cli.Id;
         cliente.Nombre = cli.Nombre;
         cliente.Direccion = cli.Direccion;
         cliente.Telefono = cli.Telefono;
         cliente.Rut = cli.RUT;
         cliente.RazonSocial = cli.RazonSocial;
         cliente.Activo = cli.Activo;

         clientesRetorno.push(cliente);
      });

      retorno.Data = clientesRetorno;

      return retorno;
   }

   async altaCliente(cliente) {
      let retorno = new Generico();
      cliente = new Cliente(cliente);

      let data = await Clientes_DAL.InsertarCliente(cliente);

      if (data.Error) {
         retorno.Ok = false;
         retorno.Status = 500;
         retorno.Message = "Ha ocurrido un error al impactar";

         retorno.InfoExtra = data.Data;
         console.log(data);

         if (data.ErrorDetail) {
            let errorBD_message = data.ErrorDetail.message;

            console.error("ERROR", errorBD_message);
         }
      } else {
         retorno.Message = "Cliente '" + cliente.Nombre + "' creado correctamente";
         retorno.Extra = cliente;
      }

      return retorno;
   }

   async editarCliente(id, cliente) {
      let retorno = new Generico();
      cliente = new Cliente(cliente);

      let data = await Clientes_DAL.EditarCliente(id, cliente);

      if (data.Error) {
         retorno.Ok = false;
         retorno.Status = 500;
         retorno.Message = "Ha ocurrido un error al impactar";

         retorno.InfoExtra = data.Data;

         if (data.ErrorDetail) {
            let errorBD_message = data.ErrorDetail.message;

            console.error("ERROR", errorBD_message);
         }
      } else {
         console.log(cliente);
         retorno.Message = "Cliente '" + cliente.Nombre + "' editado correctamente";
         retorno.Extra = cliente;
      }

      return retorno;
   }

   async bajaCliente(idCliente) {
      let retorno = new Generico();

      let cliente = await Clientes_DAL.ObtenerClientePorId(idCliente);

      if (cliente.Data.length == 0) return retorno.set(false, 400, `El cliente ${idCliente} no está registrado o no está activo.`);

      let data = await Clientes_DAL.BajaCliente(idCliente);

      if (data.Error) {
         retorno.Ok = false;
         retorno.Status = 500;
         retorno.Message = "Ha ocurrido un error al impactar";

         retorno.InfoExtra = data.Data;

         console.error("INFO EXTRA", data);
      } else {
         console.log(cliente);
         retorno.Message = "Cliente '" + cliente.Data[0].Nombre + "' dado de baja correctamente";
         retorno.Extra = cliente;
      }

      return retorno;
   }
}

module.exports = {
   Clientes_Service,
};
