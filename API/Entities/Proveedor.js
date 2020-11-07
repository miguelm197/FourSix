const Utils = require("../Utils/Utils");

class Proveedor {
   Codigo = null;
   Nombre = null;
   Telefono = null;
   Direccion = null;
   RUT = null;
   RazonSocial = null;

   constructor(proveedor) {
      Utils.setDefaultDataClass(this, proveedor);
   }
}

module.exports = {
   Proveedor,
};
