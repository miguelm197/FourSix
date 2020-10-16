const { Generico } = require("../entidades/Genericos");
const Proveedores_DAL = require("../DataAccess/Proveedores_DAL");
const { Proveedor } = require("../Entidades/Proveedor");

class Proveedores_Service {
   obtenerProveedores() {
      let resultado = dalProveedores.consultaProveedores();
      return resultado;
   }

   altaProveedor(proveedor) {
      return new Promise((resolve, reject) => {
         let retorno = new Generico();
         console.log("Impactar en BD");

         Proveedores_DAL.InsertarProveedor(proveedor).then((data) => {
            if (!data.Ok) {
               retorno.Ok = false;
               retorno.Status = 500;
               retorno.Message = "Ha ocurrido un error al impactar en la BD";

               let errorBD_message = data.InfoExtra.originalError.info.message;

               if (errorBD_message.indexOf("UC_Codigo")) {
                  retorno.InfoExtra = "Ya existe un proveedor con el código: " + proveedor.Codigo;
               }
            } else {
               retorno.Message = "Proveedor '" + proveedor.Nombre + "' creado correctamente'";

               retorno.Extra = new Proveedor(proveedor);
            }

            resolve(retorno);
         });
      });
   }
}

module.exports = {
   Proveedores_Service,
};
