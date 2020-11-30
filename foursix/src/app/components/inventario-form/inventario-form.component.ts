import { ESTADO_ITEMS } from './../../utils/global';
import { InventarioInterface } from './../../interfaces/inventario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.component.html',
  styleUrls: ['./inventario-form.component.scss'],
})
export class InventarioFormComponent implements OnInit {
  @Input() inventario: InventarioInterface;

  constructor() {}

  textoBotonSubmit = 'INGRESAR BOLETA';
  estadosItem = ESTADO_ITEMS;

  inventarioForm = new FormGroup({
    Id: new FormControl(null),
    Fecha: new FormControl(new Date(), Validators.required),
    IdProveedor: new FormControl('', Validators.required),
    NumBoleta: new FormControl('', Validators.required),
  });

  itemForm = new FormGroup({
    Id: new FormControl(null),
    Descripcion: new FormControl(new Date(), Validators.required),
    Costo: new FormControl('', Validators.required),
    IdEstado: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    if (this.inventario) {
      this.preCargarDatos(this.inventario);
      this.textoBotonSubmit = 'GUARDAR CAMBIOS';
    }
  }

  enviar() {
    // let cliente: InventarioInterface = {
    //   Id: parseInt(this.inventarioForm.controls.Id.value),
    //   Fecha: this.inventarioForm.controls.Fecha.value,
    //   Telefono: this.clienteForm.controls.Telefono.value,
    //   Direccion: this.clienteForm.controls.Direccion.value,
    //   Rut: parseInt(this.clienteForm.controls.Rut.value),
    //   RazonSocial: this.clienteForm.controls.RazonSocial.value,
    //   Activo: this.clienteForm.controls.Activo.value,
    // };
    // this.onSubmit.emit({ formulario: this.clienteForm, objeto: cliente });
  }

  limpiar() {
    this.inventarioForm.reset();
  }

  private preCargarDatos(inventario: InventarioInterface) {
    this.inventarioForm.setValue(inventario);
  }
}
