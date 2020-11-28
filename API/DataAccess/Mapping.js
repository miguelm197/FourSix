const moment = require("moment");

class BD_Proveedores {
   Codigo = null;
   Nombre = null;
   Telefono = null;
   Direccion = null;
   RUT = null;
   RazonSocial = null;
   Activo = 1;

   constructor(proveedor) {
      if (proveedor.Codigo) this.Codigo = "'" + proveedor.Codigo + "'";
      if (proveedor.Nombre) this.Nombre = "'" + proveedor.Nombre + "'";
      if (proveedor.Direccion) this.Direccion = "'" + proveedor.Direccion + "'";
      if (proveedor.RazonSocial) this.RazonSocial = "'" + proveedor.RazonSocial + "'";
      if (proveedor.Telefono) this.Telefono = "'" + proveedor.Telefono + "'";

      if (proveedor.Rut) this.RUT = proveedor.Rut;
   }
}

class BD_Clientes {
   Nombre = null;
   Telefono = null;
   Direccion = null;
   RUT = null;
   RazonSocial = null;
   Activo = 1;

   constructor(cliente) {
      if (cliente.Nombre) this.Nombre = "'" + cliente.Nombre + "'";
      if (cliente.Direccion) this.Direccion = "'" + cliente.Direccion + "'";
      if (cliente.RazonSocial) this.RazonSocial = "'" + cliente.RazonSocial + "'";
      if (cliente.Telefono) this.Telefono = "'" + cliente.Telefono + "'";

      if (cliente.Rut) this.RUT = cliente.Rut;
   }
}

class BD_Boleta {
   NumBoleta = null;
   Fecha = null;
   IdProveedor = null;

   constructor(boleta) {
      if (boleta.NumBoleta) this.NumBoleta = boleta.NumBoleta;
      if (boleta.Fecha) this.Fecha = "'" + moment(boleta.Fecha).format("YYYY-MM-DD HH:mm:ss") + "'";
      if (boleta.IdProveedor) this.IdProveedor = boleta.IdProveedor;
   }
}

class BD_Item {
   NumBoleta = null; // No requerido
   IdBoleta = null;
   Descripcion = null;
   Costo = null;
   IdEstado = null;

   constructor(item) {
      if (item.NumBoleta) this.NumBoleta = item.NumBoleta;
      if (item.IdBoleta) this.IdBoleta = item.IdBoleta;
      if (item.Descripcion) this.Descripcion = "'" + item.Descripcion + "'";
      if (item.Costo) this.Costo = item.Costo;
      if (item.IdEstado) this.IdEstado = item.IdEstado;
   }
}

module.exports = {
   BD_Proveedores,
   BD_Clientes,
   BD_Boleta,
   BD_Item,
};
