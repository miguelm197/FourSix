import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  faArrowLeft,
  faList,
  faPlusSquare,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // Iconos
  faArrowLeft = faArrowLeft;
  faList = faList;
  faPlusSquare = faPlusSquare;

  // Botones
  Botones = [];

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        let url = event.url;
        let seccion = url.split('/')[1];
        let accion = url.split('/')[2];

        this.Botones = [];

        if (seccion == 'proveedores') {
          this.Botones.push(
            new Boton(faList, 'Lista', ['proveedores', 'lista'])
          );
          this.Botones.push(
            new Boton(faPlusSquare, 'Nuevo', ['proveedores', 'nuevo'])
          );
        }

        this.Botones.forEach((boton: Boton) => {
          if (boton.Url.indexOf(accion) > -1) boton.Activo = true;
        });
      });
  }
}

class Boton {
  Icono;
  Texto = '';
  Url = [];
  Activo = false;

  constructor(
    Icono: IconDefinition,
    Texto: string,
    Url: any,
    Activo: boolean = false
  ) {
    this.Icono = Icono;
    this.Texto = Texto;
    this.Url = Url;
    this.Activo = Activo;
  }
}
