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

import { ProveedorInterface } from './../../../interfaces/proveedor..interface';
import { TarjetaProveedorComponent } from './../../../components/tarjeta-proveedor/tarjeta-proveedor.component';
import { respApiInterface } from './../../../interfaces/genericos.interface';
import { FourSixService } from './../../../services/foursix.service';
import { environment } from './../../../../environments/environment.prod';
import { UtilsService } from './../../../utils/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.scss'],
})
export class ListaProveedorComponent
  implements OnInit, AfterViewInit, OnDestroy {
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

  @ViewChild('editProveedorTpl')
  private dialogEditProv: TemplateRef<any>;

  @ViewChild('verProveedorTpl')
  private dialogVerProv: TemplateRef<any>;

  listenerFn: () => void;

  ngOnInit(): void {
    // Declaración de la tabla
    this.dtOptions = {
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: {
        url: environment.urlApi + '/ObtenerProveedores',
        type: 'POST',
        contentType: 'application/json',
        data: (grid) => JSON.stringify({ grid }),
        error: (err) => {
          console.log(err);
        },
      },
      columns: [
        { data: 'Codigo', name: 'CODIGO' },
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
                <button data-item="verMas" data-provId=${data.Id} class="dropdown-item p-2 pl-3" type="button">Ver más</button>
                <button data-item="editar" data-provId=${data.Id} class="dropdown-item p-2 pl-3" type="button">Editar</button>
                <button data-item="eliminar" data-provId=${data.Id} data-provNombre=${data.Nombre} class="dropdown-item p-2 pl-3" type="button">Eliminar</button>
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

    this.datatable = $('#dtProveedores').DataTable(this.dtOptions);

    this.utils.busquedaDataTable(this.datatable);
  }

  ngAfterViewInit(): void {
    // Escucha el click en el menú contextual de las filas
    this.listenerFn = this.renderer.listen(document, 'click', (event) => {
      let item = event.explicitOriginalTarget.attributes['data-item'];
      let provId = event.explicitOriginalTarget.attributes['data-provId'];
      let provNombre =
        event.explicitOriginalTarget.attributes['data-provNombre'];

      item = item ? item.nodeValue : false;
      provId = provId ? provId.nodeValue : false;
      provNombre = provNombre ? provNombre.nodeValue : false;

      if (item && provId) {
        if (item == 'verMas') this.modalVerProveedor(provId);
        if (item == 'editar') this.modalEditarProveedor(provId);
        if (item == 'eliminar') this.eliminarProveedor(provId, provNombre);
      }
    });
  }

  ngOnDestroy(): void {
    // Destruye el listener del menú contextual de las filas
    if (this.listenerFn) {
      this.listenerFn();
    }
  }

  modalVerProveedor(idProv) {
    this.foursix
      .obtenerProveedorPorId(idProv)
      .subscribe((res: respApiInterface) => {
        if (res.Ok) {
          let proveedor = res.Data[0];
          console.log(proveedor);

          this.dialogService.open(this.dialogVerProv, {
            context: proveedor, //datos proveedor API
            dialogClass: 'tarjetaProveedor',
          });
        }
      });

    // this.dialogService.open(TarjetaProveedorComponent, {});
  }

  modalEditarProveedor(idProv) {
    this.foursix
      .obtenerProveedorPorId(idProv)
      .subscribe((res: respApiInterface) => {
        if (res.Ok) {
          let proveedor = res.Data[0];

          this.dialogService.open(this.dialogEditProv, {
            context: proveedor, //datos proveedor API
            dialogClass: 'dialogTemplate',
          });
        }
      });
  }

  eliminarProveedor(idProv, provNombre) {
    Swal.fire({
      title: 'Eliminar proveedor',
      text: `Seguro desea eliminar el proveedor ${provNombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3366ff',
      cancelButtonColor: '#d33',
      confirmButtonText: '<strong>SI</strong>',
      cancelButtonText: '<strong>CANCELAR</strong>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarProveedorAccion(idProv);
      }
    });
  }

  onSubmit(proveedor, dialog) {
    // Realiza el POSTEO del proveedor a la API
    this.foursix
      .editarProveedor(proveedor.objeto.Id, proveedor.objeto)
      .subscribe(
        (res: respApiInterface) => {
          console.log('RESP API:', res);
          if (res.Ok) {
            this.toastrService.show(
              `Se editó el proveedor ${res.Extra['Nombre']} correctamente`,
              'Proveedores',
              { status: 'success' }
            );
            dialog.close();
            this.rerenderTabla();
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

  private eliminarProveedorAccion(idProv) {
    this.foursix.bajaProveedor(idProv).subscribe((resp: respApiInterface) => {
      if (resp.Ok) {
        console.log(resp);
        this.toastrService.show(resp.Message, 'Proveedores', {
          status: 'success',
        });

        this.rerenderTabla();
      } else {
        // ERROR
        this.toastrService.show(resp.InfoExtra, 'Proveedores', {
          status: 'danger',
        });
      }
    });
  }

  private rerenderTabla(): void {
    this.datatable.draw();
  }
}
