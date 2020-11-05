import { respApiInterface } from './../../../interfaces/genericos.interface';
import { ProveedorInterface } from './../../../interfaces/proveedor..interface';
import { FormGroup } from '@angular/forms';
import { FourSixService } from '../../../services/foursix.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.scss'],
})
export class NuevoProveedorComponent implements OnInit {
  constructor(private foursixApi: FourSixService) {}

  proveedorForm: FormGroup;

  onSubmit(evt) {
    this.proveedorForm = evt;
    console.log(this.proveedorForm);

    let proveedorObj: ProveedorInterface = {
      Codigo: this.proveedorForm.controls.codigo.value,
      Nombre: this.proveedorForm.controls.nombre.value,
    };

    this.foursixApi
      .altaProveedor(proveedorObj)
      .subscribe((res: respApiInterface) => {
        console.log('RESP API:', res);

        if (res.Ok) {
          alert('TODO OK');
        }
      });
  }

  ngOnInit(): void {
    console.log();
  }
}
