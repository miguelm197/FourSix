const Utils = require("../Utils/Utils");

class BD_Proveedores {
   Codigo = null;
   Nombre = null;
   Telefono = null;
   Direccion = null;
   RUT = null;
   RazonSocial = null;
   Activo = 1;

   constructor(proveedor) {
      Utils.setDefaultDataClass(this, proveedor);

      if (this.Codigo) this.Codigo = "'" + this.Codigo + "'";
      if (this.Nombre) this.Nombre = "'" + this.Nombre + "'";
      if (this.Direccion) this.Direccion = "'" + this.Direccion + "'";
      if (this.RazonSocial) this.RazonSocial = "'" + this.RazonSocial + "'";
      if (this.Telefono) this.Telefono = "'" + this.Telefono + "'";

      if (proveedor.Rut) this.RUT = proveedor.Rut;
   }
}

class BD_Clientes {
   Nombre = null;
   Telefono = null;
   Direccion = null;
   Mail = null;

   constructor(cliente) {
      Utils.setDefaultDataClass(this, cliente);

      if (this.Nombre) this.Nombre = "'" + this.Nombre + "'";
      if (this.Direccion) this.Direccion = "'" + this.Direccion + "'";
      if (this.Mail) this.Mail = "'" + this.Mail + "'";
   }
}

module.exports = {
   BD_Proveedores,
   BD_Clientes,
};
