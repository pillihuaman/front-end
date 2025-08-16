
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbLayoutModule } from '@nebular/theme';
import { NebularSharedModule } from '../../@domain/nebular-shared.module';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    NbButtonModule,NebularSharedModule, NbButtonModule,    NbLayoutModule,
  ]
})
export class PageComponent {
  isSearchVisible = false;
  searchQuery: string = '';
  themes = ['default', 'cosmic', 'corporate', 'dark']; 
  selectedTheme = 'default';
  constructor(
   // private router: Router,
    //private sidebarService: NbSidebarService,
    //private nbThemeService: NbThemeService,private http: HttpClient,private cdRef: ChangeDetectorRef ,
    
  ) {

  }
  /*
  OnInit(){
    console.log('init page compone')
  }
  changeTheme(theme: string) {
    this.selectedTheme = theme;
    this.nbThemeService.changeTheme(theme);
  }
  toggleSearch() {

    this.isSearchVisible = !this.isSearchVisible;
    console.log('isSearchVisible:', this.isSearchVisible);
    this.cdRef.detectChanges(); // ✅ Force UI update
  }

  onFind() {
    ;
    this.isSearchVisible = true;
    console.log('isSearchVisible:', this.isSearchVisible);
    this.cdRef.detectChanges(); // ✅ Force UI update
  }

  onSearch() {
    ;
    console.log('Searching for:', this.searchQuery);

    if (this.searchQuery.trim()) {
      const apiUrl = `https://tu-api.com/search?query=${this.searchQuery}`;

      this.http.get(apiUrl).subscribe(
        (response) => {
          console.log('Resultados:', response);
        },
        (error) => {
          console.error('Error en la búsqueda:', error);
        }
      );
    }
  }
  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout(): void {
    this.sidebarService.collapse('menu-barapp');
  }
  goHome() {
    this.router.navigate(['/home']); // Navigate to Home page
  
  }



  onLogin() {
    this.router.navigate(['/auth/login']);
  }*/
}



