class ObtenerProveedores_Order {
   SortedColumn;
   SortOrder;
   Columna;
   Orden;

   constructor(SortOptions) {
      let columna = SortOptions.SortedColumn;
      let orden = SortOptions.SortOrder;

      if (columna == "Codigo") this.SortedColumn = "Codigo";
      if (columna == "Nombre") this.SortedColumn = "Nombre";
      if (columna == "Direccion") this.SortedColumn = "Direccion";
      if (columna == "Telefono") this.SortedColumn = "Telefono";
      if (columna == "RUT") this.SortedColumn = "RUT";
      if (columna == "RazonSocial") this.SortedColumn = "RazonSocial";

      this.SortOrder = orden;
      this.Orden = orden;
      this.Columna = this.SortedColumn;
   }
}

class ObtenerClientes_Order {
   SortedColumn;
   SortOrder;
   Columna;
   Orden;

   constructor(SortOptions) {
      let columna = SortOptions.SortedColumn;
      let orden = SortOptions.SortOrder;

      if (columna == "Nombre") this.SortedColumn = "Nombre";
      if (columna == "Direccion") this.SortedColumn = "Direccion";
      if (columna == "Telefono") this.SortedColumn = "Telefono";
      if (columna == "RUT") this.SortedColumn = "RUT";
      if (columna == "RazonSocial") this.SortedColumn = "RazonSocial";

      this.SortOrder = orden;
      this.Orden = orden;
      this.Columna = this.SortedColumn;
   }
}

module.exports = { ObtenerProveedores_Order, ObtenerClientes_Order };
