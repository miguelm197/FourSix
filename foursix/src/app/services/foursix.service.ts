import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FourSixService {
  constructor(private http: HttpClient) {}

  altaProveedor(proveedor) {
    return this.http.post('http://localhost:3000/AltaProveedor', proveedor);
  }

  // consultarEstadoGeneral() {
  //   return this.http.get('http://192.168.0.150:3000/ResumenEstadoGeneral').pipe(
  //     map((data: any) =>
  //       data['Data'].map((cliente: any) => {
  //         return {
  //           ...cliente,
  //           FechaActualizacion: moment
  //             .utc(cliente.FechaActualizacion)
  //             .format('DD/MM/YYYY HH:mm'),
  //         };
  //       })
  //     )
  //   );
  // }
}
