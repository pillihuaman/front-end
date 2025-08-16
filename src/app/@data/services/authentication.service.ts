import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NbMenuItem, NbToastrService } from '@nebular/theme';

import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';

import { ResponseBody } from '../model/general/responseBody';
import { Utils } from '../../utils/utils';
import { Const } from './../../utils/const';
import { User } from '../model/User/user';
import { SystemService } from './system.service';
import { mapToNbMenuItems } from '../../utils/general';
import { ClientInfoService } from './client-info.service';
import { AuthenticationRequest } from '../model/general/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends AuthenticationRepository {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private isBrowser: boolean;
  private systemMenuSubject = new BehaviorSubject<NbMenuItem[]>([]);
  systemMenu$ = this.systemMenuSubject.asObservable();
  menuTree: NbMenuItem[] = [];
  private isMenuLoaded = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: NbToastrService, 
    private systemService: SystemService,
        private clientInfoService: ClientInfoService, 
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    super();
    this.isBrowser = isPlatformBrowser(this.platformId);

    let storedUser: User | null = null;
    if (this.isBrowser) {
      const userJson = localStorage.getItem('usuario');
      storedUser = userJson ? JSON.parse(userJson) : null;
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * ✅ FIX: Now returns `null` instead of throwing an error when no user is logged in.
   */
  public get getCurrentUserValue(): User | null {
    if (!this.currentUserSubject.value && this.isBrowser) {
      const storedUser = localStorage.getItem('usuario');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        return user;
      }
    }
    return this.currentUserSubject.value;
  }

  /**
   * Logs in the user and stores the session details.
   * @param email User email
   * @param password User password
   */
  login(email: string, password: string): Observable<User> {
    const clientInfo = this.clientInfoService.collectClientAuditInfo();
    const payload: AuthenticationRequest = {
      email,
      password,
      clientInfo
    };
    const url = `${Const.API_SEGURIDAD}/api/v1/auth/authenticate`;

    return this.http.post<ResponseBody>(url, payload).pipe(
      map((response: ResponseBody) => {
        const usuario = response.payload.user as User;
        usuario.access_token = response.payload.accessToken;
        this.currentUserSubject.next(usuario);
        if (this.isBrowser) {
          localStorage.setItem('token', response.payload.accessToken);
        }
        return usuario;
      }),
      catchError((error) => {
        this.toastrService.danger('Login failed', 'Authentication Error');
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  loadSystemsMenu(): void {
    this.systemService.findSystemMenuTree().subscribe({
      next: (response: ResponseBody) => {
        this.menuTree = mapToNbMenuItems(response.payload);
        this.isMenuLoaded = true;
        console.log('✅ Menú cargado:', this.menuTree);
      },
      error: error => {
        console.error('❌ Error al cargar el menú:', error);
      },
    });
  }

  /**
   * Logs out the user and clears the session.
   */

  logout(): void {

    if (this.isBrowser) {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
      localStorage.clear(); // por si acaso hay más cosas relacionadas
    }
    this.currentUserSubject.next(null);

  }

  /**
   * Validates user credentials by calling the backend.
   * @param email User email
   * @param password User password
   */
  private verifyCredentials(email: string, password: string): Observable<ResponseBody> {
    if (this.isBrowser) {
      localStorage.clear();
    }

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      email,
      password
    });

    const url = `${Const.API_SEGURIDAD}/api/v1/auth/authenticate`;

    return this.http.post<ResponseBody>(url, { email, password }, { headers });
  }

  /**
   * Clears user data.
   */
  clearUser(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
    this.currentUserSubject.next(null);
  }
 getGuestToken(): Observable<any> {
    const clientInfo = this.clientInfoService.collectClientAuditInfo();
    const payload: Partial<AuthenticationRequest> = { clientInfo };
    const url = `${Const.API_SEGURIDAD}/api/v1/auth/guest`;

    return this.http.post<any>(url, payload).pipe(
      map((response: any) => {
        const token = response?.payload?.accessToken ?? null;
        if (token && this.isBrowser) {
          localStorage.setItem('token', token);
        }
        return token;
      }),
      catchError(error => {
        this.toastrService.danger('Error al obtener token guest', 'Token');
        return throwError(() => new Error('No se pudo generar token guest'));
      })
    );
  }
    setMenu(menu: NbMenuItem[]) {
    this.systemMenuSubject.next(menu);
  }
}