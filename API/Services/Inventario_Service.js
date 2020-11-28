const { Generico } = require("../Entities/Genericos");
const { Inventario, Item } = require("../Entities/Inventario");
const Inventario_DAL = require("../DataAccess/DAL_Inventario");

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
}

module.exports = {
   Inventario_Service,
};
