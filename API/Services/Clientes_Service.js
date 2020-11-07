const { Generico } = require("../Entities/Genericos");
const { Cliente } = require("../Entities/Cliente");
const Clientes_DAL = require("../DataAccess/DAL_Clientes");

class Clientes_Service {
   obtenerClientes() {
      return new Promise((resolve, reject) => {
         let retorno = new Generico();

         Clientes_DAL.ConsultaClientes().then((data) => {
            if (data.Error) {
               retorno.Ok = false;
               retorno.Status = 500;
               retorno.Message = "Ha ocurrido un error al consultar a la BD";
            } else {
               retorno.Message = "Lista de clientes activos cargados en el sistema.";
               retorno.InfoExtra = "Catidad de clientes activos registrados " + data.Cant;
               retorno.Data = data.Data;
               console.log(data.Data);
               retorno.Extra = {
                  Cant: data.Cant,
               };
            }

            resolve(retorno);
         });
      });
   }

   altaCliente(cliente) {
      return new Promise((resolve) => {
         let retorno = new Generico();

         Clientes_DAL.InsertarCliente(cliente).then((data) => {
            cliente = new Cliente(cliente);

            if (data.Error) {
               retorno.Ok = false;

               retorno.InfoExtra = data.Data;

               if (data.ErrorDetail) {
                  retorno.Status = 500;
                  retorno.Message = "Ha ocurrido un error al impactar a la BD";

                  let errorBD_message = data.ErrorDetail.message;

                  if (errorBD_message.indexOf("UC_Codigo")) {
                     retorno.Message = "Ha ocurrido un error al ingresar el cliente";
                     retorno.InfoExtra = "Ya existe un cliente con el nombre: " + cliente.Nombre;
                  }
               } else {
               }
            } else {
               retorno.Message = "Cliente '" + cliente.Nombre + "' creado correctamente";
               retorno.Extra = cliente;
            }

            resolve(retorno);
         });
      });
   }
}

module.exports = {
   Clientes_Service,
};
