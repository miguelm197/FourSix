const Utils = require("../Utils/Utils");

class Inventario {
   NumBoleta = null;
   Fecha = new Date();
   IdProveedor = null;
   Items = [];

   constructor(inventario) {
      Utils.setDefaultDataClass(this, inventario);
   }
}

class Item {
   IdBoleta = null;
   NumBoleta = null;
   Descripcion = null;
   Costo = null;
   IdEstado = 1;

   constructor(item) {
      Utils.setDefaultDataClass(this, item);
   }
}

module.exports = {
   Inventario,
   Item,
};
