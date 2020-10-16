const Utils = require("../Utils/Utils");

class BD_Proveedores {
   Codigo = null;
   Nombre = null;
   Telefono = null;
   Direccion = null;
   Rut = null;
   RazonSocial = null;

   constructor(proveedor) {
      Utils.setDefaultDataClass(this, proveedor);

      if (this.Codigo) this.Codigo = "'" + this.Codigo + "'";
      if (this.Nombre) this.Nombre = "'" + this.Nombre + "'";
      if (this.Direccion) this.Direccion = "'" + this.Direccion + "'";
      if (this.RazonSocial) this.RazonSocial = "'" + this.RazonSocial + "'";
   }
}

module.exports = {
   BD_Proveedores,
};
