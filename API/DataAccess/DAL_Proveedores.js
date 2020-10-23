const { DataBaseResult, PagedQuery } = require("../Entities/Genericos");
const { ObtenerProveedores_Filter } = require("./Filters");
const { DBACCESS } = require("./index");
const { BD_Proveedores } = require("./Mapping");
const { ObtenerProveedores_Order } = require("./Orders");

const ObtenerProveedores = async (paged_query, filtros) => {
   let res = new DataBaseResult();
   let query = new PagedQuery(paged_query);
   let wheres = new ObtenerProveedores_Filter(filtros);
   let order = new ObtenerProveedores_Order(query.SortOptions);
   console.log("ORDER", order);

   console.log("QUERYYYY", query);

   let queryDB = ` SELECT * FROM PROVEEDORES 
                   WHERE activo = ${wheres.Activo}`;

   // Aplicar filtros
   if (wheres.Codigo) queryDB += ` AND Codigo LIKE '%${wheres.Codigo}%'`;
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

const InsertarProveedor = async (proveedor) => {
   let res = new DataBaseResult();

   let proveedorBD = new BD_Proveedores(proveedor);

   // Validar datos
   if (!proveedorBD.Codigo) return res.set(true, "Código requerido");
   if (!proveedorBD.Nombre) return res.set(true, "Nombre requerido");

   let queryDB = ` INSERT INTO [dbo].[Proveedores] 
                     ([Codigo], [Nombre], [Telefono], [Direccion], [RUT], [RazonSocial])
                   VALUES
                     (${proveedorBD.Codigo}, ${proveedorBD.Nombre}, ${proveedorBD.Telefono}
                     ,${proveedorBD.Direccion}, ${proveedorBD.Rut}, ${proveedorBD.RazonSocial})
   `;

   res = await DBACCESS(queryDB);

   return res;
};

module.exports = { ObtenerProveedores, InsertarProveedor };
