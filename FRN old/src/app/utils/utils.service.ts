import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  lenguajeDT() {
    return {
      search: '',
      lengthMenu: 'Mostrar _MENU_ filas',
      zeroRecords: 'No se encontraron resultados',
      emptyTable: 'Ningún dato disponible para visualizar',
      info: 'Mostrando _START_ a _END_ de _MAX_ filas',
      infoEmpty: 'Mostrando 0 filas',
      paginate: {
        first: 'Primera',
        last: 'Última',
        next: 'Siguiente',
        previous: 'Anterior',
      },
      select: {
        rows: {
          _: '%d filas seleccionadas',
          0: 'Clic en una fila para seleccionarla',
          1: '1 fila seleccionada',
        },
      },
      searchPlaceholder: 'Buscar...',
      processing:
        "<div class='overlay custom-loader-background'></div><div class='custom-processing'><i class='fa fa-cog fa-spin'></i><span>Procesando</span></div>",
    };
  }

  busquedaDataTable(datatableElement) {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that.search(this['value']).draw();
          }
        });
      });
    });
  }
}
