import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FourSixService {
  constructor(private http: HttpClient) {}

  altaProveedor(proveedor) {
    return this.http.post(environment.urlApi + '/AltaProveedor', proveedor);
  }

  editarProveedor(id, proveedor) {
    return this.http.put(
      environment.urlApi + '/EditarProveedor/' + id,
      proveedor
    );
  }

  obtenerProveedorPorId(id) {
    return this.http.get(environment.urlApi + '/Proveedor/' + id);
  }

  bajaProveedor(id) {
    return this.http.delete(environment.urlApi + '/BorrarProveedor/' + id);
  }
}
