import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconConfig, NbLayoutRulerService, NbMenuItem, NbSidebarService, NbThemeService, NbMenuModule, NbIconModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-serv-pillihuaman-header-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NbMenuModule, NbIconModule,MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './serv-pillihuaman-header-home.component.html'
})
export class ServPillihuamanHeaderHomeComponent implements OnInit {
  contadoTaggle: number = 1;
  listThemes: any[] = [
    { description: 'corporate', value: 0, position: 1 },
    { description: 'default', value: 1, position: 2 },
    { description: 'dark', value: 2, position: 3 },
    { description: 'cosmic', value: 3, position: 4 },
  ];
  items: NbMenuItem[] = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  disabledIconConfig: NbIconConfig = { icon: 'settings-2-outline', pack: 'eva' };

  constructor(
    private nbserviceThemes: NbThemeService,
    private sidebarService: NbSidebarService,
    private brakpointservice: BreakpointObserver,
    private layoutService: NbLayoutRulerService
  ) {}

  ngOnInit(): void {}

  ChangeThemes(event: any) {
    this.nbserviceThemes.changeTheme(event);
  }

  home() {}

  toggle() {
    this.sidebarService.toggle(true, 'menu-barapp');
    console.log(this.layoutService.getDimensions());
    return false;
  }
}
