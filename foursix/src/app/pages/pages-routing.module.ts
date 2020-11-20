import { ListaClienteComponent } from './clientes/lista-cliente/lista-cliente.component';
import { NuevoClienteComponent } from './clientes/nuevo-cliente/nuevo-cliente.component';
import { ListaProveedorComponent } from './proveedores/lista-proveedor/lista-proveedor.component';
import { NuevoProveedorComponent } from './proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'proveedores',
        children: [
          {
            path: '',
            redirectTo: 'lista',
          },
          {
            path: 'alta',
            component: NuevoProveedorComponent,
          },
          {
            path: 'lista',
            component: ListaProveedorComponent,
          },
        ],
      },
      {
        path: 'clientes',
        children: [
          {
            path: '',
            redirectTo: 'lista',
          },
          {
            path: 'alta',
            component: NuevoClienteComponent,
          },
          {
            path: 'lista',
            component: ListaClienteComponent,
          },
        ],
      },
      {
        path: '',
        redirectTo: 'proveedores',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
