const { DataBaseResult, PagedQuery } = require("../Entities/Genericos");
const { ObtenerClientes_Filter } = require("./Filters");
const { DBACCESS } = require("./index");
const { BD_Clientes } = require("./Mapping");
const { ObtenerClientes_Order } = require("./Orders");

const ObtenerClientes = async (paged_query, filtros) => {
   let res = new DataBaseResult();
   let query = new PagedQuery(paged_query);
   let wheres = new ObtenerClientes_Filter(filtros);
   let order = new ObtenerClientes_Order(query.SortOptions);

   let queryDB = ` SELECT * FROM CLIENTES 
                   WHERE activo = ${wheres.Activo}`;

   // Aplicar filtros
   if (wheres.Nombre) queryDB += ` AND Nombre LIKE '%${wheres.Nombre}%'`;
   if (wheres.Direccion) queryDB += ` AND Direccion LIKE '%${wheres.Direccion}%'`;
   if (wheres.Telefono) queryDB += ` AND Telefono LIKE '%${wheres.Telefono}%'`;
   if (wheres.RUT) queryDB += ` AND RUT LIKE '%${wheres.RUT}%'`;
   if (wheres.RazonSocial) queryDB += ` AND RazonSocial LIKE '%${wheres.RazonSocial}%'`;

   // Aplicar ordenamiento
   if (order) queryDB += ` ORDER BY ${order.Columna} ${order.Orden ? "ASC" : "DESC"}`;

   res = await DBACCESS(queryDB);

   return res;
};

const ObtenerClientePorId = async (id) => {
   let res = new DataBaseResult();

   let queryDB = ` SELECT * FROM CLIENTES 
                   WHERE Id = ${id} AND activo = 1`;

   res = await DBACCESS(queryDB);

   return res;
};

const InsertarCliente = async (cliente) => {
   let res = new DataBaseResult();
   let clienteBD = new BD_Clientes(cliente);

   // Validar datos
   if (!clienteBD.Nombre) return res.set(true, "Nombre requerido");

   let queryDB = ` INSERT INTO [dbo].[Clientes] 
                     ([Nombre], [Telefono], [Direccion], [RUT], [RazonSocial])
                   VALUES
                     ( ${clienteBD.Nombre}, ${clienteBD.Telefono}
                     ,${clienteBD.Direccion}, ${clienteBD.RUT}, ${clienteBD.RazonSocial})
   `;

   res = await DBACCESS(queryDB);

   return res;
};

const EditarCliente = async (id, cliente) => {
   let res = new DataBaseResult();
   let clienteBD = new BD_Clientes(cliente);

   // Validar datos
   if (!clienteBD.Nombre) return res.set(true, "Nombre requerido");

   let queryDB = ` UPDATE [dbo].[Clientes] SET  
                     [Nombre] = ${clienteBD.Nombre},
                     [Telefono] = ${clienteBD.Telefono},
                     [Direccion] = ${clienteBD.Direccion},
                     [RUT] = ${clienteBD.RUT},
                     [RazonSocial] = ${clienteBD.RazonSocial},
                     [Activo] = ${clienteBD.Activo}
                  WHERE [Id] = ${id} 
   `;

   console.log(queryDB);
   res = await DBACCESS(queryDB);

   return res;
};

const BajaCliente = async (idCliente) => {
   let res = new DataBaseResult();

   // Validar datos
   if (!idCliente) return res.set(true, "IdCliente requerido");

   let queryDB = ` UPDATE [dbo].[Clientes] SET  
                     [Activo] = 'False'
                  WHERE [Id] = ${idCliente} 
   `;

   console.log(queryDB);
   res = await DBACCESS(queryDB);

   return res;
};

module.exports = { ObtenerClientes, ObtenerClientePorId, InsertarCliente, EditarCliente, BajaCliente };
