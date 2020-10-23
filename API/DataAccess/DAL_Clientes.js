const { DataBaseResult } = require("../Entities/Genericos");
const { DBACCESS } = require("./index");
const { BD_Clientes } = require("./Mapping");

const ConsultaClientes = async (activo = true) => {
   let res = new DataBaseResult();

   let queryDB = ` SELECT * FROM CLIENTES 
                   WHERE activo = ${activo ? 1 : 0}`;

   res = await DBACCESS(queryDB);

   return res;
};

const InsertarCliente = async (cliente) => {
   let res = new DataBaseResult();
   let clienteBD = new BD_Clientes(cliente);

   // Validar datos
   if (!clienteBD.Nombre) return res.set(true, "Nombre requerido");

   let queryDB = ` INSERT INTO [dbo].[Clientes] 
                        ([Nombre], [Telefono], [Direccion], [Mail])
                    VALUES
                        (${clienteBD.Nombre},${clienteBD.Telefono},${clienteBD.Direccion},${clienteBD.Mail})                   
   `;

   res = await DBACCESS(queryDB);

   return res;
};

module.exports = { InsertarCliente, ConsultaClientes };
