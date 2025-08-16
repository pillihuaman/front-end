import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Injectable, inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { ModalRepository } from '../../@domain/repository/repository/modal.repository ';
import { AuthStateService } from '../services/AuthStateService';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  private authenticationService = inject(AuthenticationRepository);
  private modalRepository = inject(ModalRepository);
  private authState = inject(AuthStateService);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isFormData = request.body instanceof FormData;

    const headersConfig: Record<string, string> = {
      Accept: 'application/json',
    };

    if (!isFormData) {
      headersConfig['Content-Type'] = 'application/json';
    }

    if (!request.headers.has('Authorization') && this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        headersConfig['Authorization'] = `Bearer ${token}`;
      }
    }

    const clonedRequest = request.clone({ setHeaders: headersConfig });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if ([401, 403].includes(error.status)) {
          this.authState.triggerLogout(); // 🔁 Logout centralizado
        }
        return throwError(() => error);
      })
    );
  }
}
