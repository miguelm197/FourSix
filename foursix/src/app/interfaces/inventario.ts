export interface InventarioInterface {
  Id?: number;
  Fecha: Date;
  ProveedorId: number;
  ProveedorNombre?: string;
  Items: Array<InventarioItem>;
}

export interface InventarioItem {
  Id?: number;
  Descripcion: string;
  Costo: number;
  EstadoId: number;
  EstadoDescripcion?: string;
}
