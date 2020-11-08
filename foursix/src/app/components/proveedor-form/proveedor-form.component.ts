import { ProveedorInterface } from './../../interfaces/proveedor..interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.scss'],
})
export class ProveedorFormComponent implements OnInit {
  @Input() proveedor: ProveedorInterface;
  @Output() onSubmit = new EventEmitter<any>();

  textoBotonSubmit = 'INGRESAR PROVEEDOR';

  constructor() {}

  proveedorForm = new FormGroup({
    Id: new FormControl(null),
    Codigo: new FormControl('', Validators.compose([Validators.required])),
    Nombre: new FormControl('', Validators.compose([Validators.required])),
    Telefono: new FormControl(
      '',
      Validators.compose([
        Validators.pattern('[0-9]+'),
        Validators.minLength(8),
      ])
    ),
    Direccion: new FormControl('', null),
    Rut: new FormControl(
      '',
      Validators.compose([
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
      ])
    ),
    RazonSocial: new FormControl('', null),
    Activo: new FormControl(true, Validators.compose([Validators.required])),
  });

  setRutRazonSocialValidator() {
    const rutControl = this.proveedorForm.get('Rut');
    const razonSocialControl = this.proveedorForm.get('RazonSocial');

    rutControl.valueChanges.subscribe((valor) => {
      if (valor) razonSocialControl.setValidators([Validators.required]);
      else razonSocialControl.setValidators(null);

      razonSocialControl.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.setRutRazonSocialValidator();
    if (this.proveedor) {
      this.preCargarDatos(this.proveedor);
      this.textoBotonSubmit = 'EDITAR PROVEEDOR';
    }
  }

  enviar() {
    let proveedor: ProveedorInterface = {
      Codigo: this.proveedorForm.controls.Codigo.value,
      Nombre: this.proveedorForm.controls.Nombre.value,
      Telefono: this.proveedorForm.controls.Telefono.value,
      Direccion: this.proveedorForm.controls.Direccion.value,
      Rut: parseInt(this.proveedorForm.controls.Rut.value),
      RazonSocial: this.proveedorForm.controls.RazonSocial.value,
      Activo: this.proveedorForm.controls.Activo.value,
    };

    this.onSubmit.emit({ formulario: this.proveedorForm, objeto: proveedor });
  }

  limpiar() {
    this.proveedorForm.reset();
  }

  preCargarDatos(proveedor: ProveedorInterface) {
    console.log(proveedor);
    this.proveedorForm.setValue(proveedor);
  }
}
