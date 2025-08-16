import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  count = 0;

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.count++;

    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
        }
      })
    );
  }
}
