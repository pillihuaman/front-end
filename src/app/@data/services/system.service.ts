import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Const } from '../../utils/const';
import { RequestBody } from '../model/general/requestBody';
import { ResponseBody } from '../model/general/responseBody';
import { MenuItem } from '../model/system/MenuItem';
import { Page } from '../model/system/Page';
import { System } from '../model/system/System';
import { ReqSystem } from '../model/system/ReqSystem';
import { RespSystemEntities } from '../model/system/RespSystemEntities';
import { RespMenuTree } from '../model/system/RespMenuTree';
import { NbMenuItem } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private systemSubject = new BehaviorSubject<System[]>([]);
  private pageSubject = new BehaviorSubject<Page[]>([]);
  private menuSubject = new BehaviorSubject<MenuItem[]>([]);
  system$ = this.systemSubject.asObservable();
  page$ = this.pageSubject.asObservable();
  menu$ = this.menuSubject.asObservable();

private systemMenuSubject = new BehaviorSubject<NbMenuItem[]>([]);
  public readonly systemMenu$ = this.systemMenuSubject.asObservable();

  
  constructor(private http: HttpClient, private apiService: ApiService) {}
  // SYSTEM
  findSystems(filters?: { id?: string; name?: string; page?: number; pagesize?: number }): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/system`;
  
    const params: any = {};
    if (filters?.id) params.id = filters.id;
    if (filters?.name) params.name = filters.name;
    if (filters?.page != null) params.page = filters.page;
    if (filters?.pagesize != null) params.pagesize = filters.pagesize;
  
    return this.apiService.get(url, params);
  }
  

  saveSystem(system: System): Observable<ResponseBody> {
    const request: RequestBody = { data: system, trace: { traceId: '01' } };
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/system`;
    return this.apiService.post(url, request);
  }

  deleteSystem(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/system/${id}`;
    return this.apiService.delete(url);
  }

  // PAGE
  findPages(): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/page`;
    return this.apiService.get(url);
  }

  findPagesBySystem(systemId: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/page/bySystem?systemId=${systemId}`;
    return this.apiService.get(url);
  }

  savePage(page: Page): Observable<ResponseBody> {
    const request: RequestBody = { data: page, trace: { traceId: '01' } };
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/page`;
    return this.apiService.post(url, request);
  }

  deletePage(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/page/${id}`;
    return this.apiService.delete(url);
  }

  // MENU
  findMenus(): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/menu`;
    return this.apiService.get(url);
  }

  findMenusBySystem(systemId: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/menu/bySystem?systemId=${systemId}`;
    return this.apiService.get(url);
  }

  findMenusByParent(parentId: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/menu/byParent?parentId=${parentId}`;
    return this.apiService.get(url);
  }

  saveMenuItem(menu: MenuItem): Observable<ResponseBody> {
    const request: RequestBody = { data: menu, trace: { traceId: '01' } };
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/menu`;
    return this.apiService.post(url, request);
  }

  deleteMenu(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/menu/${id}`;
    return this.apiService.delete(url);
  }

  // Subjects for reactive data stream
  fetchSystems() {
    this.findSystems().subscribe(response => {
      this.systemSubject.next(response.payload);
    });
  }

  fetchPages() {
    this.findPages().subscribe(response => {
      this.pageSubject.next(response.payload);
    });
  }

  fetchMenus() {
    this.findMenus().subscribe(response => {
      this.menuSubject.next(response.payload);
    });
  }

  reloadSystems() {
    this.systemSubject.next(this.systemSubject.value);
  }

  reloadPages() {
    this.pageSubject.next(this.pageSubject.value);
  }

  reloadMenus() {
    this.menuSubject.next(this.menuSubject.value);
  }
  searchSystemEntitiesLineal(filters: ReqSystem): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/system/general`;
  
    const params: any = {};
    if (filters?.id) params.id = filters.id;
    if (filters?.name) params.name = filters.name;
    if (filters?.pageName) params.pageName = filters.pageName;
    if (filters?.pageUrl) params.pageUrl = filters.pageUrl;
    if (filters?.menuTitle) params.menuTitle = filters.menuTitle;
    if (filters?.menuUrl) params.menuUrl = filters.menuUrl;
    if (filters?.page != null) params.page = filters.page;
    if (filters?.pagesize != null) params.pagesize = filters.pagesize;
  
    return this.apiService.get(url, params);
  }
  findSystemMenuTree(): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/system/menu-tree`;
    return this.apiService.get(url);
  }
  

  setSystemMenu(menu: NbMenuItem[]): void {
    this.systemMenuSubject.next(menu);
  }
}
