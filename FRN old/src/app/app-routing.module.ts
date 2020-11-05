import { NuevoProveedorComponent } from './pages/nuevo-proveedor/nuevo-proveedor.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'proveedores', pathMatch: 'full', redirectTo: 'proveedores/lista' },
  { path: 'proveedores/lista', component: ProveedoresComponent },
  { path: 'proveedores/nuevo', component: NuevoProveedorComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
