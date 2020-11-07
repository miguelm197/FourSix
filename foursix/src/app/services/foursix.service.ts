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
}
