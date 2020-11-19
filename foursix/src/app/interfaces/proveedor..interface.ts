import { Identifiers } from '@angular/compiler';

export interface ProveedorInterface {
  Id?: number;
  Codigo: string;
  Nombre: string;
  Telefono?: string;
  Direccion?: string;
  Rut?: number;
  RazonSocial?: string;
  Activo?: string;
}
