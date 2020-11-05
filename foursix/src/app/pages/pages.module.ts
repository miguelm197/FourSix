import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  NbAutocompleteModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbStepperModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { DataTablesModule } from 'angular-datatables';

import { PagesComponent } from './pages.component';
import { NuevoProveedorComponent } from './proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { ListaProveedorComponent } from './proveedores/lista-proveedor/lista-proveedor.component';
import { ProveedorFormComponent } from './../components/proveedor-form/proveedor-form.component';

@NgModule({
  declarations: [
    PagesComponent,
    NuevoProveedorComponent,
    ProveedorFormComponent,
    ListaProveedorComponent,
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
    NbTreeGridModule,
  ],
})
export class PagesModule {}
