import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authenticationService = inject(AuthenticationRepository);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean; // ✅ Agregado

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId); // ✅ Definir si está en el navegador
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isBrowser) {
      return true;
    }
  
    let currentUser = this.authenticationService.getCurrentUserValue;
    if (!currentUser && this.isBrowser) { // ✅ Ya se tiene isBrowser definido
      const storedUser = localStorage.getItem('usuario');
      if (storedUser) {
        currentUser = JSON.parse(storedUser);
      }
    }
  
    if (currentUser) {
      const helper = new JwtHelperService();
      const token = currentUser.access_token || localStorage.getItem('token');
  
      if (token && helper.isTokenExpired(token)) {
        this.authenticationService.clearUser();
        console.error('Token expired. Redirecting to login.');
        this.router.navigate(['/auth/login']);
        return false;
      } else if (route.routeConfig?.path === 'auth') {
        return false; // Bloquea el acceso a /auth si el usuario ya está autenticado
      }
      return true;
    }
  
    console.error('User not authenticated. Redirecting to login.');
    this.router.navigate(['/auth/login']);
    return false;
  }
}
