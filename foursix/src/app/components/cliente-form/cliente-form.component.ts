import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteInterface } from './../../interfaces/cliente.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit {
  @Input() cliente: ClienteInterface;
  @Output() onSubmit = new EventEmitter<any>();

  constructor() {}
  textoBotonSubmit = 'INGRESAR CLIENTE';

  clienteForm = new FormGroup({
    Id: new FormControl(null),
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

  private setRutRazonSocialValidator() {
    const rutControl = this.clienteForm.get('Rut');
    const razonSocialControl = this.clienteForm.get('RazonSocial');

    rutControl.valueChanges.subscribe((valor) => {
      if (valor) razonSocialControl.setValidators([Validators.required]);
      else razonSocialControl.setValidators(null);

      razonSocialControl.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.setRutRazonSocialValidator();
    if (this.cliente) {
      this.preCargarDatos(this.cliente);
      this.textoBotonSubmit = 'GUARDAR CAMBIOS';
    }
  }

  enviar() {
    let cliente: ClienteInterface = {
      Id: parseInt(this.clienteForm.controls.Id.value),
      Nombre: this.clienteForm.controls.Nombre.value,
      Telefono: this.clienteForm.controls.Telefono.value,
      Direccion: this.clienteForm.controls.Direccion.value,
      Rut: parseInt(this.clienteForm.controls.Rut.value),
      RazonSocial: this.clienteForm.controls.RazonSocial.value,
      Activo: this.clienteForm.controls.Activo.value,
    };

    this.onSubmit.emit({ formulario: this.clienteForm, objeto: cliente });
  }

  limpiar() {
    this.clienteForm.reset();
  }

  private preCargarDatos(cliente: ClienteInterface) {
    this.clienteForm.setValue(cliente);
  }
}
