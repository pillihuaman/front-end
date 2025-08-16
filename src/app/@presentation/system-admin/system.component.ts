import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbSidebarService, NbThemeService, NbButtonModule} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../@domain/nebular-shared.module';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    NbButtonModule,NebularSharedModule, NbButtonModule
  ]
})
export class SystemComponent {
  constructor(
    private sidebarService: NbSidebarService,
    private nbThemeService: NbThemeService
  ) {}

  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout(): void {
    this.sidebarService.collapse('menu-barapp');
  }
}
