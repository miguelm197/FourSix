const { Generico } = require("../Entities/Genericos");
const { Inventario, Item } = require("../Entities/Inventario");
const Inventario_DAL = require("../DataAccess/DAL_Inventario");
const { InventarioResult } = require("../Entities/Results/InventarioResult");

class Inventario_Service {
   async altaInventario(invent) {
      let retorno = new Generico();
      let inventario = new Inventario(invent);

      console.log("SERVICIO ", inventario);

      let data = await Inventario_DAL.InsertarInventario(inventario);

      if (data.Error) {
         retorno.Ok = false;
         retorno.Status = 500;
         retorno.Message = "Ha ocurrido un error al impactar";

         retorno.InfoExtra = data.Data;

         if (data.ErrorDetail) {
            let errorBD_message = data.ErrorDetail.message;
            if (errorBD_message.indexOf("UNIQUE KEY") > -1) {
               retorno.InfoExtra = "Ya existe la boleta con el código: " + inventario.NumBoleta;
            }
         }
      } else {
         retorno.Message = "Inventario  creado correctamente";
         retorno.Extra = { ...inventario, NumBoleta: data.Data[0]["NumBoleta"] };

         if (inventario.Items.length > 0) {
            inventario.Items.forEach((ite) => {
               let item = new Item(ite);
               item.IdBoleta = data.Data[0]["NumBoleta"];

               Inventario_DAL.InsertarItem(item).then((dataItem) => {
                  console.log(item);

                  if (dataItem.Error) {
                     retorno.Ok = false;
                     retorno.Status = 500;
                     retorno.Message = "Ha ocurrido un error al impactar el item '" + item.Descripcion + "'";

                     return retorno;
                  }
               });
            });
         }
      }

      return retorno;
   }

   obtenerInventarioPorId(id) {
      return new Promise(async (resolve) => {
         let retorno = new Generico();

         let resBD = await Inventario_DAL.ObtenerInventarioPorId(id);

         if (resBD.Error) {
            resolve(retorno.set(false, 500, resBD.Message));
         }

         if (resBD.Data.length == 0) {
            resolve(retorno.set(false, 400, "No se encontró un inventario con el identificador " + id));
         }

         resBD.Data.forEach((boleta) => {
            let inventario = new InventarioResult();

            inventario.Fecha = boleta.Fecha;
            inventario.NumBoleta = boleta.NumBoleta;
            inventario.IdBoleta = boleta.Id;
            inventario.IdProveedor = boleta.IdProveedor;

            Inventario_DAL.ObtenerItemsPorIdBoleta(boleta.Id).then((res) => {
               if (res.Error) {
                  resolve(retorno.set(false, 500, "Ha ocurrido un error al obtener los items para la boleta " + boleta.Id));
               }

               res.Data.forEach((item) => {
                  inventario.Items.push(new Item(item));
               });

               retorno.Data = inventario;

               resolve(retorno);
            });
         });
      });
   }
}

module.exports = {
   Inventario_Service,
};
