import { UtilsService } from './../../../utils/utils.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { DataTableDirective } from 'angular-datatables';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.scss'],
})
export class ListaProveedorComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  constructor(private http: HttpClient, private utils: UtilsService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: {
        url: 'http://MARK-XLIII:3000/ObtenerProveedores',
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
      ],
      dom: 't<"table_length_info""<il>p>',
      order: [[1, 'asc']],
      language: this.utils.lenguajeDT(),
    };
  }

  ngAfterViewInit(): void {
    this.utils.busquedaDataTable(this.datatableElement);
  }
}
