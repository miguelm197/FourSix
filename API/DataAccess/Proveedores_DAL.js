const { Generico } = require("../entidades/Genericos");
const { DBACCESS } = require("./index");
const { BD_Proveedores } = require("./Mapping");

const ConsultaProveedores = (activo = true) => {
   return new Promise((resolve) => {
      let queryDB = ` SELECT * FROM PROVEEDORES 
        WHERE activo = ${activo}`;

      DBACCESS(queryDB).then((data) => {
         resolve(data);
      });
   });
};

const InsertarProveedor = async (proveedor) => {
   let res = new Generico();

   let proveedorBD = new BD_Proveedores(proveedor);

   // Validar datos
   if (!proveedorBD.Codigo) return res.set(false, null, "Código requerido");
   if (!proveedorBD.Nombre) return res.set(false, null, "Nombre requerido");

   let queryDB = ` 
         INSERT INTO [dbo].[Proveedores]
            ([Codigo], [Nombre], [Telefono], [Direccion], [RUT], [RazonSocial])
         VALUES
            (${proveedorBD.Codigo}, ${proveedorBD.Nombre}, ${proveedorBD.Telefono}
            ,${proveedorBD.Direccion}, ${proveedorBD.Rut}, ${proveedorBD.RazonSocial})
      `;

   let resBD = await DBACCESS(queryDB);

   if (resBD.Error) {
      res.Ok = false;
      res.Message = resBD.Message;
      res.InfoExtra = resBD.Error;
   }

   return res;
};

module.exports = { ConsultaProveedores, InsertarProveedor };
