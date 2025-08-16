import { Component } from '@angular/core';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbLayoutModule } from '@nebular/theme';
import { NebularSharedModule } from '../../@domain/nebular-shared.module';

@Component({
  selector: 'app-web-pages',
  standalone: true,
  imports: [
   CommonModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    NbButtonModule,NebularSharedModule, NbButtonModule,    NbLayoutModule,
  ],
  templateUrl: './web-pages.component.html',
  styleUrl: './web-pages.component.scss'
})
export class WebPagesComponent {
  constructor(
private authService:AuthenticationRepository
  ) { }


ngOnInit(): void {

}

private tokenExists(): boolean {
  return typeof localStorage !== 'undefined' && !!localStorage.getItem('token');
}
}



