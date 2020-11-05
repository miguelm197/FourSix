import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UtilsService } from './../../utils/utils.service';

import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  constructor(private http: HttpClient, private utils: UtilsService) {}

  ngOnInit(): void {
    const that = this;

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
