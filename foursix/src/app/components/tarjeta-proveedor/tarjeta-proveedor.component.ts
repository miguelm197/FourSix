import { ProveedorInterface } from './../../interfaces/proveedor..interface';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-tarjeta-proveedor',
  templateUrl: './tarjeta-proveedor.component.html',
  styleUrls: ['./tarjeta-proveedor.component.scss'],
})
export class TarjetaProveedorComponent implements OnInit {
  @Input() proveedor: ProveedorInterface;
  constructor() {}

  ngOnInit(): void {}
}
