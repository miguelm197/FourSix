const { DataBaseResult } = require("../Entities/Genericos");
const { BD_Boleta, BD_Item } = require("./Mapping");
const { DBACCESS } = require("./index");

const InsertarInventario = async (invent) => {
   let res = new DataBaseResult();
   let inventarioBD = new BD_Boleta(invent);

   // Validar datos
   if (!inventarioBD.IdProveedor) return res.set(true, "El proveedor es requerido");
   if (!inventarioBD.NumBoleta) return res.set(true, "El número de boleta es requerido");

   let queryDB = `  INSERT INTO [dbo].[Boletas]
                        ([NumBoleta], [Fecha], [IdProveedor])
                    VALUES
                        (${inventarioBD.NumBoleta}, ${inventarioBD.Fecha}, ${inventarioBD.IdProveedor})

                    SELECT SCOPE_IDENTITY() AS NumBoleta`;

   res = await DBACCESS(queryDB);

   return res;
};

const InsertarItem = async (ite) => {
   let res = new DataBaseResult();
   let itemBD = new BD_Item(ite);

   // Validar datos
   if (!itemBD.IdBoleta) return res.set(true, "El id de la boleta es requerido");
   if (!itemBD.Descripcion) return res.set(true, "La descripción es requerida");
   if (!itemBD.Costo) return res.set(true, "El costo es requerido");
   if (!itemBD.IdEstado) return res.set(true, "El estado es requerido");

   let queryDB = `   INSERT INTO [dbo].[Items]
                        ([IdBoleta], [Descripcion], [Costo], [IdEstado])
                    VALUES
                       (${itemBD.IdBoleta}, ${itemBD.Descripcion}, ${itemBD.Costo}, ${itemBD.IdEstado}) `;

   res = await DBACCESS(queryDB);

   return res;
};

const ObtenerInventarioPorId = async (id) => {
   let res = new DataBaseResult();

   let queryDB = `   SELECT * FROM BOLETAS WHERE Id = ${id} `;

   res = await DBACCESS(queryDB);

   return res;
};

const ObtenerItemsPorIdBoleta = async (id) => {
   let res = new DataBaseResult();

   let queryDB = `   SELECT * FROM ITEMS WHERE IdBoleta = ${id} `;

   res = await DBACCESS(queryDB);

   return res;
};

module.exports = { InsertarInventario, InsertarItem, ObtenerInventarioPorId, ObtenerItemsPorIdBoleta };
