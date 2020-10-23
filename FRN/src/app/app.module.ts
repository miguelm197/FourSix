import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';

import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { NuevoProveedorComponent } from './pages/nuevo-proveedor/nuevo-proveedor.component';


@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    NavbarComponent,
    MenuComponent,
    NuevoProveedorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    DataTablesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
