import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';
import { NbComponentStatus } from '@nebular/theme';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private hasShownErrorToast = false;
  private lastErrorCode: number | null = null;

  constructor(private modalService: ModalService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const status: NbComponentStatus = 'danger';

        if (this.lastErrorCode === error.status && this.hasShownErrorToast) {
          return throwError(() => error);
        }

        this.lastErrorCode = error.status;
        this.hasShownErrorToast = true;

        switch (error.status) {
          case 500:
            this.modalService.showToast(status, 'Error interno del servidor', '');
            break;
          case 404:
            this.modalService.showToast(status, 'Recurso no encontrado', '');
            break;
          case 0:
            this.modalService.showToast(status, 'Servidor no disponible', '');
            break;
          default:
            this.modalService.showToast(status, `Error: ${error.message}`, '');
        }

        setTimeout(() => {
          this.hasShownErrorToast = false;
        }, 3000);

        return throwError(() => error);
      })
    );
  }
}
