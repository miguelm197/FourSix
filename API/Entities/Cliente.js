const Utils = require("../Utils/Utils");

class Cliente {
   Nombre = null;
   Telefono = null;
   Direccion = null;
   RUT = null;
   RazonSocial = null;

   constructor(cliente) {
      Utils.setDefaultDataClass(this, cliente);
   }
}

module.exports = {
   Cliente,
};
