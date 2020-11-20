import { ClienteFormComponent } from './../../../components/cliente-form/cliente-form.component';
import { respApiInterface } from './../../../interfaces/genericos.interface';
import { Router } from '@angular/router';
import { FourSixService } from './../../../services/foursix.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.scss'],
})
export class NuevoClienteComponent implements OnInit {
  // Establece comunicación con los métodos y propiedades del componente hijo
  @ViewChild(ClienteFormComponent) compCliente: ClienteFormComponent;

  constructor(
    private foursix: FourSixService,
    private toastrService: NbToastrService,
    private router: Router
  ) {}

  formulario: FormGroup;

  onSubmit(cliente) {
    // Realiza el POSTEO del cliente a la API
    this.foursix.altaCliente(cliente.objeto).subscribe(
      (res: respApiInterface) => {
        console.log('RESP API:', res);

        if (res.Ok) {
          this.toastrService.show(
            `Se creó el cliente ${res.Extra['Nombre']} correctamente`,
            'Clientes',
            { status: 'success' }
          );
          this.compCliente.limpiar();
          this.router.navigate(['clientes', 'lista']);
        } else {
          // ERROR
          this.toastrService.show(res.InfoExtra, 'Clientes', {
            status: 'danger',
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
