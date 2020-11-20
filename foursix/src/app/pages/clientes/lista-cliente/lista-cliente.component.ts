import { respApiInterface } from './../../../interfaces/genericos.interface';
import { UtilsService } from './../../../utils/utils.service';
import { FourSixService } from './../../../services/foursix.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  Renderer2,
  TemplateRef,
} from '@angular/core';

import {
  NbDialogService,
  NbMenuService,
  NbToastrService,
} from '@nebular/theme';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss'],
})
export class ListaClienteComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private dialogService: NbDialogService,
    private nbMenuService: NbMenuService,
    private renderer: Renderer2,
    private foursix: FourSixService,
    private utils: UtilsService,
    private toastrService: NbToastrService
  ) {}

  dtOptions: DataTables.Settings = {};
  datatable;

  @ViewChild('editClienteTpl')
  private dialogEditCli: TemplateRef<any>;

  @ViewChild('verClienteTpl')
  private dialogVerCli: TemplateRef<any>;

  listenerFn: () => void;

  ngOnInit(): void {
    // Declaración de la tabla
    this.dtOptions = {
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: {
        url: environment.urlApi + '/cliente/obtenerClientes',
        type: 'POST',
        contentType: 'application/json',
        data: (grid) => JSON.stringify({ grid }),
        error: (err) => {
          console.log(err);
        },
      },
      columns: [
        { data: 'Nombre', name: 'NOMBRE' },
        { data: 'Telefono', name: 'TELEFONO' },
        { data: 'Direccion', name: 'DIRECCION' },
        { data: 'RUT', name: 'RUT' },
        { data: 'RazonSocial', name: 'RAZON SOCIAL' },
        {
          data: null,
          searchable: false,
          orderable: false,

          render: function (data, type, full, meta) {
            return `
             <div class="dropdown dropleft">
              <button class="btn btn-link" type="button" id="menuFila" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
              </button>

              <div class="dropdown-menu" aria-labelledby="menuFila">
                <button data-item="verMas" data-cliId=${data.Id} class="dropdown-item p-2 pl-3" type="button">Ver más</button>
                <button data-item="editar" data-cliId=${data.Id} class="dropdown-item p-2 pl-3" type="button">Editar</button>
                <button data-item="eliminar" data-cliId=${data.Id} data-cliNombre=${data.Nombre} class="dropdown-item p-2 pl-3" type="button">Eliminar</button>
              </div>
            </div>
            `;
          },
        },
      ],
      dom: 't<"table_length_info""<il>p>',
      order: [[1, 'asc']],
      language: this.utils.lenguajeDT(),
    };

    this.datatable = $('#dtClientes').DataTable(this.dtOptions);

    this.utils.busquedaDataTable(this.datatable);
  }

  ngAfterViewInit(): void {
    // Escucha el click en el menú contextual de las filas
    this.listenerFn = this.renderer.listen(document, 'click', (event) => {
      let item = event.explicitOriginalTarget.attributes['data-item'];
      let cliId = event.explicitOriginalTarget.attributes['data-cliId'];
      let cliNombre = event.explicitOriginalTarget.attributes['data-cliNombre'];

      item = item ? item.nodeValue : false;
      cliId = cliId ? cliId.nodeValue : false;
      cliNombre = cliNombre ? cliNombre.nodeValue : false;

      if (item && cliId) {
        if (item == 'verMas') this.modalVerCliente(cliId);
        if (item == 'editar') this.modalEditarCliente(cliId);
        if (item == 'eliminar') this.eliminarCliente(cliId, cliNombre);
      }
    });
  }

  ngOnDestroy(): void {
    // Destruye el listener del menú contextual de las filas
    if (this.listenerFn) {
      this.listenerFn();
    }
  }

  modalVerCliente(idClie) {
    this.foursix
      .obtenerClientePorId(idClie)
      .subscribe((res: respApiInterface) => {
        if (res.Ok) {
          let Cliente = res.Data[0];
          console.log(Cliente);
          this.dialogService.open(this.dialogVerCli, {
            context: Cliente, //datos Cliente API
            dialogClass: 'tarjetaCliente',
          });
        }
      });
  }

  modalEditarCliente(idClie) {
    this.foursix
      .obtenerClientePorId(idClie)
      .subscribe((res: respApiInterface) => {
        if (res.Ok) {
          let Cliente = res.Data[0];
          this.dialogService.open(this.dialogEditCli, {
            context: Cliente, //datos Cliente API
            dialogClass: 'dialogTemplate',
          });
        }
      });
  }

  eliminarCliente(idClie, cliNombre) {
    Swal.fire({
      title: 'Eliminar Cliente',
      text: `Seguro desea eliminar el Cliente ${cliNombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3366ff',
      cancelButtonColor: '#d33',
      confirmButtonText: '<strong>SI</strong>',
      cancelButtonText: '<strong>CANCELAR</strong>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarClienteAccion(idClie);
      }
    });
  }

  onSubmit(Cliente, dialog) {
    // Realiza el POSTEO del Cliente a la API
    this.foursix.editarCliente(Cliente.objeto.Id, Cliente.objeto).subscribe(
      (res: respApiInterface) => {
        console.log('RESP API:', res);
        if (res.Ok) {
          this.toastrService.show(
            `Se editó el Cliente ${res.Extra['Nombre']} correctamente`,
            'Clientes',
            { status: 'success' }
          );
          dialog.close();
          this.rerenderTabla();
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

  private eliminarClienteAccion(idClie) {
    this.foursix.bajaCliente(idClie).subscribe((resp: respApiInterface) => {
      if (resp.Ok) {
        console.log(resp);
        this.toastrService.show(resp.Message, 'Clientes', {
          status: 'success',
        });
        this.rerenderTabla();
      } else {
        // ERROR
        this.toastrService.show(resp.InfoExtra, 'Clientes', {
          status: 'danger',
        });
      }
    });
  }

  private rerenderTabla(): void {
    this.datatable.draw();
  }
}
