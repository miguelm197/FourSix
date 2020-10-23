const Utils = require("../Utils/Utils");

class Cliente {
   Nombre = null;
   Telefono = null;
   Direccion = null;
   Mail = null;

   constructor(cliente) {
      Utils.setDefaultDataClass(this, cliente);
   }
}

module.exports = {
   Cliente,
};
