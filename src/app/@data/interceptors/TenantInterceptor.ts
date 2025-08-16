import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      const hostname = window?.location?.hostname ?? 'unknown';
      console.log('[Interceptor ejecutado] Host:', hostname);

      const tenantHeaderReq = req.clone({
        setHeaders: {
          'X-Tenant-ID': hostname
        }
      });

      return next.handle(tenantHeaderReq);
    } catch (err) {
      console.error('[Interceptor error]', err);
      return next.handle(req); // ⛑️ Evita colapsar la app
    }
  }
}



