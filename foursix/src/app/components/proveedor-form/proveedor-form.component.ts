import { ProveedorInterface } from './../../interfaces/proveedor..interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.scss'],
})
export class ProveedorFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();

  constructor() {}

  proveedorForm = new FormGroup({
    codigo: new FormControl('', Validators.compose([Validators.required])),
    nombre: new FormControl('', Validators.compose([Validators.required])),
    telefono: new FormControl(
      '',
      Validators.compose([
        Validators.pattern('[0-9]+'),
        Validators.minLength(8),
      ])
    ),
    direccion: new FormControl('', null),
    rut: new FormControl(
      '',
      Validators.compose([
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
      ])
    ),
    razonSocial: new FormControl('', null),
    activo: new FormControl(true, Validators.compose([Validators.required])),
  });

  setRutRazonSocialValidator() {
    const rutControl = this.proveedorForm.get('rut');
    const razonSocialControl = this.proveedorForm.get('razonSocial');

    rutControl.valueChanges.subscribe((valor) => {
      if (valor) razonSocialControl.setValidators([Validators.required]);
      else razonSocialControl.setValidators(null);

      razonSocialControl.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.setRutRazonSocialValidator();
  }

  enviar() {
    let proveedor: ProveedorInterface = {
      Codigo: this.proveedorForm.controls.codigo.value,
      Nombre: this.proveedorForm.controls.nombre.value,
      Telefono: this.proveedorForm.controls.telefono.value,
      Direccion: this.proveedorForm.controls.direccion.value,
      Rut: parseInt(this.proveedorForm.controls.rut.value),
      RazonSocial: this.proveedorForm.controls.razonSocial.value,
      Activo: this.proveedorForm.controls.activo.value,
    };

    this.onSubmit.emit({ formulario: this.proveedorForm, objeto: proveedor });
  }

  limpiar() {
    this.proveedorForm.reset();
  }
}
