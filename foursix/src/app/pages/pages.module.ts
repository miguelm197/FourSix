import { ClienteFormComponent } from './../components/cliente-form/cliente-form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  NbAutocompleteModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbStepperModule,
} from '@nebular/theme';
import { DataTablesModule } from 'angular-datatables';

import { PagesComponent } from './pages.component';
import { NuevoProveedorComponent } from './proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { ListaProveedorComponent } from './proveedores/lista-proveedor/lista-proveedor.component';
import { ProveedorFormComponent } from './../components/proveedor-form/proveedor-form.component';
import { TarjetaProveedorComponent } from './../components/tarjeta-proveedor/tarjeta-proveedor.component';
import { NuevoClienteComponent } from './clientes/nuevo-cliente/nuevo-cliente.component';
import { ListaClienteComponent } from './clientes/lista-cliente/lista-cliente.component';
import { NuevoInventarioComponent } from './inventario/nuevo-inventario/nuevo-inventario.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    PagesComponent,
    NuevoProveedorComponent,
    ProveedorFormComponent,
    ClienteFormComponent,
    ListaProveedorComponent,
    TarjetaProveedorComponent,
    NuevoClienteComponent,
    ListaClienteComponent,
    NuevoInventarioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    DataTablesModule,
    NbLayoutModule,
    NbButtonModule,
    NbSidebarModule,
    NbInputModule,
    NbCardModule,
    NbFormFieldModule,
    NbIconModule,
    NbStepperModule,
    NbDatepickerModule,
    NbSelectModule,
    NbBadgeModule,
    NbCheckboxModule,
    NbAutocompleteModule,
    NbMenuModule,
    NbContextMenuModule,
    NbDialogModule.forChild(),
    NbListModule,
    SweetAlert2Module,
    NgSelectModule,
  ],
})
export class PagesModule {}
