import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faList, faPlusSquare} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faList = faList;
  faPlusSquare = faPlusSquare;

  constructor() {}

  ngOnInit(): void {}
}
