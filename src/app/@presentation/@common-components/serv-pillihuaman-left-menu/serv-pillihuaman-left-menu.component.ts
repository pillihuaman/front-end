import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serv-pillihuaman-left-menu',
  templateUrl: './serv-pillihuaman-left-menu.component.html',
  styleUrls: ['./serv-pillihuaman-left-menu.component.scss']
})
export class ServPillihuamanLeftMenuComponent implements OnInit {

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];
  constructor() { }

  ngOnInit(): void {
  }
  open() {
    return false;
  }
}
