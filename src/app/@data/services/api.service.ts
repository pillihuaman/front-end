import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { ImagenTemp } from '../model/imagen/imagenTemp';

@Injectable()
export class ApiService {
  /*httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }*/
    constructor(private http: HttpClient, public dialog: MatDialog) {}

  requestFilter(request: any): string {
    let api = '';
    Object.keys(request).forEach((key) => {
      const oldVal = request[key];
      const newVal =
        oldVal || oldVal === 0
          ? typeof oldVal === 'string'
            ? oldVal.trim()
            : oldVal
          : null;
      if (newVal || newVal === 0) {
        api += `${key}=${newVal}&`;
      }
    });
    api = api.substr(0, api.length - 1);
    return api;
  }

  public formatErrors(err: HttpErrorResponse) {
    //debuger;
    const messageError = err.error ? err.error : err;
    if (
      err &&
      err.error &&
      err.error.status &&
      err.error.status.error &&
      err.error.status.error.messages
    ) {
      // Extract the error message from payload.message
      const errorMessage = err.error.payload ? err.error.payload.message : 'An error occurred';
      return throwError(errorMessage);
    }
    return throwError(messageError);
  }

  get(path: string, params?: any): Observable<any> {
    return this.http.get(path, { params }).pipe(
      catchError((error) => {
        //mensje
        return this.formatErrors(error);
      })
    );
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(path, body).pipe(
      catchError((error) => {
        //mensje
        return this.formatErrors(error);
      })
    );
  }

  patch(path: string, body: object = {}): Observable<any> {
    return this.http.patch(path, body).pipe(
      catchError((error) => {
        //mensje
        return this.formatErrors(error);
      })
    );
  }

  post(path: string, body: any): Observable<any> {
    //debuger;
    return this.http.post(path, body).pipe();
  }

  uploadFilesMultipartFile(formData: FormData, url: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(url, formData, { headers }).pipe(
      catchError((error) => this.formatErrors(error))
    );
  }
  postToFile(path: string, body: ImagenTemp): Observable<any> {
    return this.http.post(path, body).pipe(
      catchError((error) => {
        //mensje
        return this.formatErrors(error);
      })
    );
  }
  postFile(path: string, body: FormData): Observable<any> {
    
    console.log(`POST to File Request: ${path} with body:`, body);  // Imprime el cuerpo de la solicitud POST a archivos
    for (const pair of body.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    return this.http.post(path, body).pipe(
      catchError((error) => {
        console.log(`POST `, error); 
        return this.formatErrors(error);
      })
    );
  }
  putHTML(path: string, body: object = {}): Observable<any> {
    return this.http
      .put(path, body, {
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          //mensje
          return this.formatErrors(error);
        })
      );
  }

  postHTML(path: string, body: object = {}): Observable<any> {
    return this.http
      .post(path, body, {
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          //mensje
          return this.formatErrors(error);
        })
      );
  }

  getHTML(path: string): Observable<any> {
    return this.http
      .get(path, {
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          //mensje
          return this.formatErrors(error);
        })
      );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(path).pipe(
      catchError((error) => {
        //mensje
        return this.formatErrors(error);
      })
    );
  }
}
