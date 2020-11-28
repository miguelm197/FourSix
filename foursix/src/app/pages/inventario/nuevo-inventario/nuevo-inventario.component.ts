import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-inventario',
  templateUrl: './nuevo-inventario.component.html',
  styleUrls: ['./nuevo-inventario.component.scss'],
})
export class NuevoInventarioComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  selectedCar: number;

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
}
