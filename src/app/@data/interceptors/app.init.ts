import { AuthenticationService } from "../services/authentication.service";
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export function initApp(authService: AuthenticationService) {
  const platformId = inject(PLATFORM_ID);

  return () => {
    if (isPlatformBrowser(platformId)) {
      const token = localStorage.getItem('token');
      if (!token) {
        return authService.getGuestToken().toPromise();
      }
    }

    return Promise.resolve(); // en SSR o si ya hay token
  };
}
