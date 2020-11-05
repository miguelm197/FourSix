import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.scss'],
})
export class ProveedorFormComponent implements OnInit {
  constructor() {}

  proveedorForm = new FormGroup({
    codigo: new FormControl('', Validators.compose([Validators.required])),
    nombre: new FormControl('', Validators.compose([Validators.required])),
    telefono: new FormControl(
      '',
      Validators.compose([Validators.pattern('[0-9]+')])
    ),
    direccion: new FormControl('', null),
    rut: new FormControl('', null),
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

  onSubmit() {
    console.log(this.proveedorForm);
  }
}
