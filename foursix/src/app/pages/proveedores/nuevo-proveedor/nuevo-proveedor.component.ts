import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { respApiInterface } from './../../../interfaces/genericos.interface';
import { ProveedorInterface } from './../../../interfaces/proveedor..interface';
import { FourSixService } from '../../../services/foursix.service';
import { ProveedorFormComponent } from 'src/app/components/proveedor-form/proveedor-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.scss'],
})
export class NuevoProveedorComponent implements OnInit {
  // Establece comunicación con los métodos y propiedades del componente hijo
  @ViewChild(ProveedorFormComponent) compProveedor: ProveedorFormComponent;

  constructor(
    private foursixApi: FourSixService,
    private toastrService: NbToastrService,
    private router: Router
  ) {}

  formulario: FormGroup;

  onSubmit(proveedor) {
    // Realiza el POSTEO del proveedor a la API
    this.foursixApi.altaProveedor(proveedor.objeto).subscribe(
      (res: respApiInterface) => {
        console.log('RESP API:', res);

        if (res.Ok) {
          this.toastrService.show(
            `Se creó el proveedor ${res.Extra['Nombre']} correctamente`,
            'Proveedores',
            { status: 'success' }
          );

          this.compProveedor.limpiar();
          this.router.navigate(['lista']);
        } else {
          // ERROR
          this.toastrService.show(res.InfoExtra, 'Proveedores', {
            status: 'danger',
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    console.log();
  }
}
