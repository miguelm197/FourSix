import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  faCartPlus,
  faTruck,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  // Iconos
  faCartPlus = faCartPlus;
  faTruck = faTruck;
  faUserFriends = faUserFriends;

  // Ruteo "activo"
  NuevaVenta = false;
  Proveedores = false;
  Clientes = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        let url = event.url;
        let seccion = url.split('/')[1];

        this.NuevaVenta = seccion === 'nuevaVenta' ? true : false;
        this.Proveedores = seccion === 'proveedores' ? true : false;
        this.Clientes = seccion === 'clientes' ? true : false;
      });
  }
}
