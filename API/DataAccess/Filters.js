const Utils = require("../Utils/Utils");

class ObtenerProveedores_Filter {
   Codigo;
   Nombre;
   Direccion;
   Telefono;
   RazonSocial;
   RUT;
   Activo = 1;

   constructor(filtros) {
      Utils.setDefaultDataClass(this, filtros);

   }
}

module.exports = { ObtenerProveedores_Filter };
