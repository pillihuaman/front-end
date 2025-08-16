import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-serv-pillihuaman-footer-home',
  templateUrl: './serv-pillihuaman-footer-home.component.html',
  styleUrls: ['./serv-pillihuaman-footer-home.component.scss'],
    imports: [   CommonModule,
      NbButtonModule,
      NbIconModule,
      NebularSharedModule],
})
export class ServPillihuamanFooterHomeComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
