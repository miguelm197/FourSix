import { environment } from './../../../../environments/environment.prod';
import { UtilsService } from './../../../utils/utils.service';
import { map, filter } from 'rxjs/operators';

import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Renderer2,
  TemplateRef,
} from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { NbDialogService, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.scss'],
})
export class ListaProveedorComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  constructor(
    private dialogService: NbDialogService,
    private nbMenuService: NbMenuService,
    private renderer: Renderer2,
    private utils: UtilsService
  ) {}
  @ViewChild('editProveedorTpl')
  private dialogEditProv: TemplateRef<any>;

  menuFila = [{ title: 'Profile' }, { title: 'Logout' }];

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
                <button data-item="eliminar" data-provId=${data.Id} class="dropdown-item p-2 pl-3" type="button">Eliminar</button>
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

    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => console.log('title ' + title));
  }

  ngAfterViewInit(): void {
    this.utils.busquedaDataTable(this.datatableElement);

    // Escuchar la selección del item en el menú de la fila
    this.renderer.listen('document', 'click', (event) => {
      let item = event.explicitOriginalTarget.attributes['data-item'];
      let provId = event.explicitOriginalTarget.attributes['data-provId'];

      item = item ? item.nodeValue : false;
      provId = provId ? provId.nodeValue : false;

      if (item && provId) {
        if (item == 'verMas') this.modalVerProveedor(provId);
        if (item == 'editar') this.modalEditarProveedor(provId);
        if (item == 'eliminar') this.eliminarProveedor(provId);
      }
    });
  }

  modalVerProveedor(idProv) {
    console.log(this.dialogEditProv);
  }

  modalEditarProveedor(idProv) {
    this.dialogService.open(this.dialogEditProv, {
      dialogClass: 'dialogTemplate',
    });
  }

  eliminarProveedor(idProv) {
    alert('eliminarProveedor - ' + idProv);
  }
}
