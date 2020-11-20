import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: 'pages',
    },
    {
      title: 'Proveedores',
      icon: 'car-outline',
      children: [
        {
          title: 'Nuevo proveedor',
          icon: 'plus-circle-outline',
          link: 'proveedores/alta',
        },
        {
          title: 'Lista de proveedores',
          icon: 'book-outline',
          link: 'proveedores/lista',
        },
      ],
    },
    {
      title: 'Clientes',
      icon: 'person-outline',
      children: [
        {
          title: 'Nuevo cliente',
          icon: 'plus-circle-outline',
          link: 'clientes/alta',
        },
        {
          title: 'Lista de clientes',
          icon: 'book-outline',
          link: 'clientes/lista',
        },
      ],
    },
    // {
    //   title: 'Login',
    //   icon: 'log-in-outline',
    //   link: '../login',
    // },
  ];
}
